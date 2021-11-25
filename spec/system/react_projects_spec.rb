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

    it 'can enter a project title' do
      fill_in "project0", with: 'This is my new project\n'
    end

    it 'can delete a 2nd project' do
      expect(page).to have_selector("project0")
      expect(page).not_to have_selector("project1")
      # within "#sidebar-container" do
      #   fill_in "project1", with: 'This is my new project\n'
      # end
      #
      # project_one = find("project1")
      # project_one.native.send_keys(:return)
      # expect(page).to have_selector("project2")
      #
      # second_project = find("project2")
      # fill_in second_project, with: 'This is my 2nd project\n'
      # second_project.native.send_keys(:return)
      # (second_project.value.length + 1).times { field.send_keys [:backspace] }
      # expect(page).not_to have_selector("project2")
    end
  end
end
