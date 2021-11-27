RSpec.describe "React Sign In", type: :system do
  it 'renders a React component' do
    visit '/'
    expect(page).to have_content('Move work forward')
  end

  context 'with a bad login' do
    let(:user) { create(:user) }

    before do
      visit "/"

      click_button "Log In"
      fill_in "EMAIL ADDRESS", with: user.email
      fill_in "PASSWORD", with: "bad_password"

      click_button "Sign In"
    end

    it 'remains logged out' do
      expect(page).not_to have_text("Welcome Robert")
      expect(page).to have_content('Move work forward')
    end
  end

  context 'with a user' do
    let(:user) { create(:user) }

    before do
      visit "/"

      click_button "Log In"
      fill_in "EMAIL ADDRESS", with: user.email
      fill_in "PASSWORD", with: "rainbow_table"

      click_button "Sign In"
    end

    it "has user greeting" do
      expect(page).to have_text("Welcome Robert")
    end

    it 'makes valid updates' do
      expect(page).to have_text("Welcome Robert")

      click_button 'Account'
      fill_in "username", with: 'The Best User'
      click_button "Update Profile"

      expect(page).to have_text("Welcome The Best User")
    end

    # TODO: add error handling and reject state changes for this
    xit 'errors on invalid updates' do
      expect(page).to have_text("Welcome Robert")
      click_button 'Account'
      fill_in "username", with: ''
      click_button "Update Profile"

      expect(page).to have_text("Welcome Robert")
    end

    it 'can log back out' do
      expect(page).to have_text("Welcome Robert")
      click_button 'Log Out'
      expect(page).not_to have_text("Welcome Robert")
      expect(page).to have_content('Move work forward')
    end
  end
end
