RSpec.describe "React", type: :system do
  context 'when unauthorized' do
    let(:user) { create(:user) }
    it "renders 401" do
      visit "/#/projects/1"

      expect(page).to have_text("Check Out the DEMO Account")
    end
  end

  context 'when signed in' do
    let(:user) { create(:user) }

    before do
      visit "/"

      click_button "Log In"
      fill_in "EMAIL ADDRESS", with: user.email
      fill_in "PASSWORD", with: "rainbow_table"

      click_button "Sign In"
    end

    it 'can enter a project title' do
      fill_in "0", with: 'This is my new project\n'
    end

    it 'can delete a 2nd project' do
      expect(page).not_to have_selector("project1")

      project_one = find("project0")
      fill_in project_one, with: 'This is my new project\n'
      project_one.native.send_keys(:return)
      expect(page).to have_selector("project1")

      second_project = find("project1")
      fill_in second_project, with: 'This is my 2nd project\n'
      second_project.native.send_keys(:return)
      (second_project.value.length + 1).times { field.send_keys [:backspace] }
      expect(page).not_to have_selector("project1")
    end
  end
end
