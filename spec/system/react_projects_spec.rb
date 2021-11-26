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

    # it 'can enter a project title' do
    #   fill_in "project0", with: 'This is my new project'
    #   expect(page).to have_text("This is my new project")
    #   byebug
    # end
    #
    # it 'can delete a 2nd project' do
    #   byebug
    #   expect(page).to have_field("project0")
    #   expect(page).not_to have_field("project1")
    #   fill_in "project0", with: 'This is my new project'
    #   seeded_project = find_by_id("project0")
    #   seeded_project.native.send_keys(:return)
    #   expect(page).to have_selector("project1")
    #
    #   newly_entered_project = find("project2")
    #   fill_in newly_entered_project, with: 'This is my 2nd project\n'
    #   newly_entered_project.native.send_keys(:return)
    #   (newly_entered_project.value.length + 1).times { field.send_keys [:backspace] }
    #   expect(page).not_to have_selector("project2")
    # end
  end
end
