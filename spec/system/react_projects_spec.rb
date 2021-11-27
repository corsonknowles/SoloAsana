RSpec.describe "React Project Changes", type: :system do
  let(:user) { create(:user) }

  context 'when unauthorized' do
    it "renders 401" do
      visit "/#/projects/1"

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

    let(:team) { create(:team) }
    let!(:project) { create(:project, user: user, team: team) }

    it 'can enter a project title' do
      fill_in "project0", with: 'This is my new project'
      expect(page).to have_field("project0", with: 'This is my new project')
    end

    context 'with a task' do
      let!(:task) { create(:task, user: user, team: team, project: project) }

      it 'can enter a task' do
        find_by_id("project0").click # TODO: add a feature to make this unneccessary
        fill_in "task0", with: 'This is my new task'
        expect(page).to have_field("task0", with: 'This is my new task')
      end

      it 'can delete a 2nd task' do
        expect(page).not_to have_field("task1")

        find_by_id("project0").click # TODO: add a feature to make this unneccessary
        fill_in "task0", with: 'This is my new task'
        seeded_task = find_by_id("task0")
        seeded_task.native.send_keys(:return)
        expect(page).to have_field("task1")

        fill_in ("task1"), with: 'test text'
        newly_entered_task = find_by_id("task1")
        (newly_entered_task.value.length + 1).times { newly_entered_task.send_keys [:backspace] }

        expect(page).not_to have_field("task1")
      end
    end

    it 'can delete a 2nd project' do
      expect(page).to have_field("project0")
      expect(page).not_to have_field("project1")
      fill_in "project0", with: 'This is my new project'
      seeded_project = find_by_id("project0")
      seeded_project.native.send_keys(:return)

      fill_in ("project1"), with: 'This is my 2nd project\n'
      newly_entered_project = find_by_id("project1")
      newly_entered_project.native.send_keys(:return)

      expect(page).to have_field("project1")

      (newly_entered_project.value.length + 1).times { newly_entered_project.send_keys [:backspace] }
      expect(page).not_to have_selector("project1")
    end
  end
end
