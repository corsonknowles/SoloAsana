# frozen_string_literal: true

RSpec.describe "React Project Changes", type: :system do
  # Regression: relative API URLs (e.g. `api/projects/id`) resolved incorrectly
  # when the browser pathname was already `/projects/:id` (BrowserRouter).
  # The fix was to prefix all API utility URLs with a leading `/`.
  let(:user) { create(:user) }

  context "when switching between projects via the sidebar" do
    # :without_initial_project prevents User#initialize_project from adding a
    # phantom project0 that would shift first_project to project1 in the sidebar.
    let(:user) { create(:user, :without_initial_project) }
    # Data must be declared before `before` so it exists when the React app
    # first fetches projects after login.
    let!(:team)           { create(:team) }
    let!(:first_project)  { create(:project, user: user, team: team) }
    let!(:first_task)     { create(:task,    user: user, team: team, project: first_project) }
    let!(:second_project) { create(:project, user: user, team: team) }
    let!(:second_task)    { create(:task,    user: user, team: team, project: second_project) }

    before do
      visit "/"
      click_button "Log In"
      fill_in "EMAIL ADDRESS", with: user.email
      fill_in "PASSWORD", with: "rainbow_table"
      click_button "Sign In"
    end

    it "loads tasks for the first project when clicked" do
      find_by_id("project0").click
      expect(page).to have_current_path("/projects/#{first_project.id}")
      expect(page).to have_field("task0")
    end

    it "loads tasks for a project clicked from another project's URL" do
      find_by_id("project0").click
      expect(page).to have_current_path("/projects/#{first_project.id}")
      expect(page).to have_field("task0")

      # While the browser pathname is already /projects/:id, clicking a different
      # project must still fetch tasks via an absolute API path.
      find_by_id("project1").click
      expect(page).to have_current_path("/projects/#{second_project.id}")
      expect(page).to have_field("task0")
    end

    it "restores the last-viewed project after page reload" do
      find_by_id("project0").click
      expect(page).to have_current_path("/projects/#{first_project.id}")
      find_by_id("project1").click
      expect(page).to have_current_path("/projects/#{second_project.id}")
      expect(page).to have_field("task0")
      # Allow updateUser PATCH to persist latest_project before reload
      30.times do
        break if user.reload.latest_project == second_project.id
        sleep 0.1
      end
      expect(user.reload.latest_project).to eq(second_project.id)
      visit page.current_path
      # Wait for Projects to fetch, select a project, and load tasks
      expect(page).to have_field("task0", wait: 5)
      expect(page).to have_current_path("/projects/#{second_project.id}")
    end
  end

  context "when unauthorized" do
    it "renders 401 on the projects view" do
      visit "/projects/1"

      expect(page).to have_text("Check Out the DEMO Account")
    end
  end

  context "when signed in" do
    before do
      visit "/"

      click_button "Log In"
      fill_in "EMAIL ADDRESS", with: user.email
      fill_in "PASSWORD", with: "rainbow_table"

      click_button "Sign In"
    end

    let(:team) { create(:team) }
    let!(:project) { user.projects.last }

    # it makes a project when there is no project

    it "can enter a project title" do
      fill_in "project0", with: "This is my new project"
      expect(page).to have_field("project0", with: "This is my new project")
    end

    it "cannot delete the only project" do
      expect(page).to have_field("project0")

      the_only_project = find_by_id("project0")

      (the_only_project.value.length + 1).times { the_only_project.send_keys [:backspace] }
      expect(page).to have_field("project0")
    end

    it "can update a project" do
      expect do
        ActiveRecord::Base.after_transaction do
          expect(page).to have_field("project0", with: project.name.to_s)
          find_by_id("project0").native.send_keys("F")
          keyup_js = "document.getElementById('project0').dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }))"
          page.execute_script keyup_js
          expect(page).to have_field("project0", with: "#{project.name}F")
        end
      end.to change { Project.last.reload.name }.from(project.name).to("#{project.name}F")
    end

    it "can create a 2nd project" do
      expect(page).to have_field("project0")
      expect(page).not_to have_field("project1")

      fill_in "project0", with: "This is my new project"
      seeded_project = find_by_id("project0")
      seeded_project.native.send_keys(:return)

      expect(page).to have_field("project1")
    end

    context "with an additional seeded project" do
      let!(:second_project) { create(:project, user: user, team: team) }

      # let! runs *after* the outer before-login, so the React app fetched
      # projects before second_project existed.  Wait for the login XHR to
      # finish (session cookie must be written before we navigate), then
      # re-visit "/" so React fetches the now-complete project list.
      before do
        expect(page).to have_text("Welcome") # rubocop:disable RSpec/ExpectInHook
        visit "/"
      end

      it "can delete a 2nd project" do
        expect(page).to have_field("project0")
        expect(page).to have_field("project1")

        not_the_only_project = find_by_id("project1")
        (not_the_only_project.value.length + 1).times { not_the_only_project.send_keys [:backspace] }

        expect(page).to have_field("project0")
        expect(page).not_to have_field("project1")
      end

      it "keeps the project in the UI when the server rejects the delete" do
        # Install a fetch mock that makes DELETE /api/projects/:id return a 422.
        # This exercises the destroyProject error callback in projects_actions.js
        # which is unreachable in normal use (the client-side guard stops the call
        # when only one project exists, and a real delete always succeeds for 2+).
        page.execute_script(<<~JS)
          (function () {
            var orig = window.fetch;
            window.fetch = function (url, opts) {
              if (opts && opts.method === 'DELETE' && String(url).indexOf('/api/projects/') !== -1) {
                return Promise.resolve({
                  ok: false, status: 422,
                  json: function () { return Promise.resolve(['Cannot delete project']); }
                });
              }
              return orig.call(this, url, opts);
            };
          })();
        JS

        expect(page).to have_field("project0")
        expect(page).to have_field("project1")

        expect do
          second = find_by_id("project1")
          # project name is nil → field is already empty → one Backspace triggers delete
          (second.value.length + 1).times { second.send_keys [:backspace] }
          # project1 must still be visible: the mock caused receiveErrors to fire
          # instead of deleteProject, so Redux keeps the project in state
          expect(page).to have_field("project1")
        end.not_to change(Project, :count)
      end

      it "can type and navigate between projects" do
        expect(page).to have_field("project1")

        fill_in "project0", with: "This is my first project"
        seeded_project = find_by_id("project0")
        seeded_project.native.send_keys(:down)
        expect(page.evaluate_script("document.activeElement.id")).to eq "project1"

        fill_in "project1", with: "This is my second project"
        next_project = find_by_id("project1")
        next_project.native.send_keys(:up)
        expect(page.evaluate_script("document.activeElement.id")).to eq "project0"
      end

      it "navigates between projects" do
        expect(page).to have_field("project0")
        expect(page).to have_field("project1")

        expect do
          seeded_project = find_by_id("project0")
          seeded_project.native.send_keys(:down)
          expect(page.evaluate_script("document.activeElement.id")).to eq "project1"

          next_project = find_by_id("project1")
          next_project.native.send_keys(:up)
          expect(page.evaluate_script("document.activeElement.id")).to eq "project0"
        end.not_to change(Project, :count)
      end

      it "stops going up at the top of the list" do
        expect do
          expect(page).to have_field("project1")

          seeded_project = find_by_id("project0")
          seeded_project.native.send_keys(:up)
          seeded_project.native.send_keys(:up)
          expect(page.evaluate_script("document.activeElement.id")).to eq "project0"
        end.not_to raise_error
      end

      it "stops going down at the top of the list" do
        expect do
          expect(page).to have_field("project1")

          seeded_project = find_by_id("project1")
          seeded_project.native.send_keys(:down)
          seeded_project.native.send_keys(:down)
          expect(page.evaluate_script("document.activeElement.id")).to eq "project1"
        end.not_to raise_error
      end

      it "changes focus after hitting enter" do
        expect(page).to have_field("project0")
        expect(page).to have_field("project1")
        expect(page).not_to have_field("project2")

        seeded_project = find_by_id("project0")
        seeded_project.native.send_keys(:return)

        expect(page).to have_field("project2")
        expect(page.evaluate_script("document.activeElement.id")).to eq "project1"
      end

      context "with empty project names" do
        let!(:second_project) { create(:project, user: user, team: team, name: "") }

        it "focuses on the last remaining project after deleting the end of the list" do
          expect(page).to have_field("project0")
          expect(page).to have_field("project1")
          expect(page).not_to have_field("project2")

          latest_project = find_by_id("project1")
          latest_project.native.send_keys(:delete)

          expect(page).not_to have_field("project1")
          expect(page.evaluate_script("document.activeElement.id")).to eq "project0"
        end

        it "focuses on the last remaining project after deleting the beginning of the list" do
          expect(page).to have_field("project0")
          expect(page).to have_field("project1")
          expect(page).not_to have_field("project2")

          first_project = find_by_id("project0")
          first_project.native.send_keys(:delete)

          expect(page).not_to have_field("project1")
          expect(page.evaluate_script("document.activeElement.id")).to eq "project0"
        end
      end
    end
  end
end
