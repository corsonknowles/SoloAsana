require 'rails_helper'

RSpec.describe "React", type: :system do
  it 'renders a React component' do
    visit '/'
    expect(page).to have_content('Move work forward')
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
