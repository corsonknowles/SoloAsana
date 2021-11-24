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
  end
end
