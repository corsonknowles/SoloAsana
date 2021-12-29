# frozen_string_literal: true

RSpec.describe "React Project Changes", type: :system do
  let(:user) { create(:user) }

  context "when unauthorized" do
    it "renders 401 on the projects view" do
      visit "/#/projects/1"

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
    let!(:project) { create(:project, user: user, team: team) }

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
        seeded_project = find_by_id("project0")
        seeded_project.native.send_keys("F")
        page.execute_script %{ $('#project0').trigger('keyup') }
        ActiveRecord::Base.after_transaction do
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

    context "with 2 seeded projects" do
      let!(:second_project) { create(:project, user: user, team: team) }

      it "can delete a 2nd project" do
        expect(page).to have_field("project1")

        not_the_only_project = find_by_id("project1")
        (not_the_only_project.value.length + 1).times { not_the_only_project.send_keys [:backspace] }

        expect(page).not_to have_selector("project1")
      end

      it "can navigate between projects" do
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

      it "changes focus after hitting enter" do
        expect(page).to have_field("project0")
        expect(page).to have_field("project1")
        expect(page).not_to have_field("project2")

        seeded_project = find_by_id("project0")
        seeded_project.native.send_keys(:return)

        expect(page).to have_field("project2")
        expect(page.evaluate_script("document.activeElement.id")).to eq "project1"
      end

      it "focuses on the last remaining project after deleting the rest" do
        expect(page).to have_field("project0")
        expect(page).to have_field("project1")
        expect(page).not_to have_field("project2")

        fill_in "project0", with: "0"
        fill_in "project1", with: ""
        latest_project = find_by_id("project1")
        latest_project.native.send_keys(:delete)

        expect(page).not_to have_field("project1")
        expect(page.evaluate_script("document.activeElement.id")).to eq "project0"
      end
    end
  end
end
