RSpec.describe "React Profile Photo", type: :system do
  context 'with a valid login' do
    let(:user) { create(:user) }

    before do
      visit "/"

      click_button "Log In"
      fill_in "EMAIL ADDRESS", with: user.email
      fill_in "PASSWORD", with: user.password

      click_button "Sign In"
    end

    it 'can load the dropzone' do
      expect(page).to have_text("Welcome Robert")

      click_button 'Account'
      find("figure.profile-photo").click
      expect(page).to have_text("Drop an image")
      expect(page).to have_text("Or, click to select a file to upload")
      click_on(class: 'inner-modal')
      click_button 'Update Profile'
    end
  end
end
