# frozen_string_literal: true

RSpec.describe "React Profile Updates", type: :system do
  context "with a valid login" do
    let(:user) { create(:user) }

    before do
      visit "/"

      click_button "Log In"
      fill_in "EMAIL ADDRESS", with: user.email
      fill_in "PASSWORD", with: user.password

      click_button "Sign In"
    end

    it "can edit the user profile" do
      expect(page).to have_text("Welcome #{user.username}")

      click_button "Account"
      fill_in "username", with: "i made this"
      fill_in "role", with: "nachos"
      fill_in "department", with: "cats"
      fill_in "about me", with: "catherd"

      click_button "Update Profile"

      expect(page).to have_text("Welcome i made this")
    end
  end
end
