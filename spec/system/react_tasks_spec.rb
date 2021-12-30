# frozen_string_literal: true

RSpec.describe "React Tasks Changes", type: :system do
  let(:user) { create(:user) }

  let(:team) { create(:team) }
  let!(:project) { create(:project, user: user, team: team) }

  context "when unauthorized" do
    it "proceeds to the logged out view" do
      visit "/#/projects/#{project.id}"

      expect(page).to have_text("Check Out the DEMO Account")
    end
  end

  context 'when signed in' do
    before do
      visit "/"

      click_button "Log In"
      fill_in "EMAIL ADDRESS", with: user.email
      fill_in "PASSWORD", with: "rainbow_table"

      click_button "Sign In"
    end

    it 'initializes a task when a taskless project is clicked' do
      expect do
        expect(page).not_to have_field("task0")
        find_by_id("project0").click # TODO: this is kind of an anti-feature on first login
        expect(page).to have_field("task0")
      end.to change(Task, :count).by(1)
    end

    context 'with a seeded task' do
      let!(:task) { create(:task, user: user, team: team, project: project) }

      it 'loads the task when the project is clicked' do
        expect do
          expect(page).not_to have_field("task0")
          find_by_id("project0").click # TODO: this is kind of an anti-feature on first login
          expect(page).to have_field("task0")
        end.not_to change(Task, :count)
      end
    end
  end

  context "when signed in and visiting the project path" do
    before do
      visit "/"

      click_button "Log In"
      fill_in "EMAIL ADDRESS", with: user.email
      fill_in "PASSWORD", with: "rainbow_table"

      click_button "Sign In"
      expect(page).to have_content "Welcome Robert the Chief"
      visit "/#/projects/#{project.id}"
    end

    it "can enter a new task" do
      expect do
        fill_in "task0", with: "F"
        page.execute_script %{ $("#task0").trigger('keyup') }
        seeded_task = find_by_id("task0")
        seeded_task.native.send_keys(:return)
      end.to change(Task, :count).by(1)

      expect(page).to have_field("task0", with: "F")
      expect(page).to have_field("task1", with: "")
    end

    context "with a seeded task" do
      let!(:task) { create(:task, user: user, team: team, project: project) }

      it "can fill in a task" do
        fill_in "task0", with: "This is my new task"
        expect(page).to have_field("task0", with: "This is my new task")
      end

      it "cannot delete the only task" do
        expect(page).to have_field("task0")
        expect(page).not_to have_field("task1")

        the_only_task = find_by_id("task0")

        (the_only_task.value.length + 1).times { the_only_task.send_keys [:backspace] }
        expect(page).to have_field("task0")
      end

      it "can update a task" do
        expect(page).to have_field("task0", with: task.title)

        expect do
          seeded_task = find_by_id("task0")
          seeded_task.native.send_keys("F")
          page.execute_script %{ $("#task0").trigger('keyup') }
          ActiveRecord::Base.after_transaction do
            expect(page).to have_field("task0", with: "#{task.title}F")
          end
        end.to change { Task.last.reload.title }.from(task.title).to("#{task.title}F")
      end

      it "can delete a 2nd task" do
        expect(page).not_to have_field("task1")

        fill_in "task0", with: "This is my new task"
        seeded_task = find_by_id("task0")
        seeded_task.native.send_keys(:return)
        expect(page).to have_field("task1")

        fill_in "task1", with: "test"
        newly_entered_task = find_by_id("task1")
        (newly_entered_task.value.length + 1).times { newly_entered_task.send_keys [:backspace] }

        expect(page).not_to have_field("task1")
      end
    end

    context "with 2 seeded tasks" do
      let!(:task) { create(:task, user: user, team: team, project: project) }
      let!(:second_task) { create(:task, user: user, team: team, project: project) }

      it "can navigate between tasks" do
        expect(page).to have_field("task0")
        expect(page).to have_field("task1")

        fill_in "task0", with: "This is my first task"
        fill_in "task1", with: "This is my second task"

        seeded_task = find_by_id("task0")
        seeded_task.native.send_keys(:down)
        expect(page.evaluate_script("document.activeElement.id")).to eq "task1"

        next_task = find_by_id("task1")
        next_task.native.send_keys(:up)
        expect(page.evaluate_script("document.activeElement.id")).to eq "task0"
      end
    end
  end
end
