# frozen_string_literal: true

RSpec.describe "React Tasks Changes", type: :system do
  let(:user) { create(:user) }

  context "when unauthorized" do
    it "renders 401" do
      visit "/#/projects/tasks"

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
    let!(:task) { create(:task, user: user, team: team, project: project) }

    it "can enter a new task" do
      find_by_id("project0").click # TODO: add a feature to make this unneccessary
      fill_in "task0", with: "This is my new task"
      expect(page).to have_field("task0", with: "This is my new task")
    end

    it "can delete a 2nd task" do
      expect(page).not_to have_field("task1")

      find_by_id("project0").click # TODO: add a feature to make this unneccessary
      fill_in "task0", with: "This is my new task"
      seeded_task = find_by_id("task0")
      seeded_task.native.send_keys(:return)
      expect(page).to have_field("task1")

      fill_in "task1", with: "test"
      newly_entered_task = find_by_id("task1")
      (newly_entered_task.value.length + 1).times { newly_entered_task.send_keys [:backspace] }

      expect(page).not_to have_field("task1")
    end

    it "cannot delete the only project" do
      expect(page).to have_field("project0")

      the_only_project = find_by_id("project0")

      (the_only_project.value.length + 1).times { the_only_project.send_keys [:backspace] }
      expect(page).to have_field("project0")
    end
  end
end
