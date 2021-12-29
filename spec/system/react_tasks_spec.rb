# frozen_string_literal: true

RSpec.describe "React Tasks Changes", type: :system do
  let(:user) { create(:user) }

  context "when unauthorized" do
    it "renders 401 on the tasks view" do
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

    it "can update a task" do
      find_by_id("project0").click # TODO: add a feature to make this unneccessary
      expect(page).to have_field("task0")

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
      find_by_id("project0").click # TODO: add a feature to make this unneccessary
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

    context "with 2 seeded tasks" do
      let!(:second_task) { create(:task, user: user, team: team, project: project) }

      it "can navigate between tasks" do
        find_by_id("project0").click # TODO: add a feature to make this unneccessary

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

    it "cannot delete the only task" do
      find_by_id("project0").click # TODO: add a feature to make this unneccessary
      expect(page).to have_field("task0")
      expect(page).not_to have_field("task1")

      the_only_task = find_by_id("task0")

      (the_only_task.value.length + 1).times { the_only_task.send_keys [:backspace] }
      expect(page).to have_field("task0")
    end
  end
end
