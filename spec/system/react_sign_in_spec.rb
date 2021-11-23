RSpec.describe "React", type: :system do
  it 'renders a React component' do
    visit '/'
    expect(page).to have_content('Move work forward')
  end

  context 'when unauthorized' do
    let(:user) { create(:user) }
    it "renders 401" do
      visit "/#/projects/1"

      expect(page).to have_text("Welcome Robert")
    end
  end

  context 'with a user' do
    let(:user) { create(:user) }

    it "has user login" do
      visit "/"

      click_button "Log In"
      fill_in "EMAIL ADDRESS", with: user.email
      fill_in "PASSWORD", with: "rainbow_table"

      click_button "Sign In"

      expect(page).to have_text("Welcome Robert")
    end
  end
end
