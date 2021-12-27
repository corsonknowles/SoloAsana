# frozen_string_literal: true

RSpec.describe "React Demo Sign In", type: :system do
  subject(:visit_page_with_seed_user) do
    User.first_or_create(
      email: "awesome.user@example.com", # match the seed user
      username: "Robert",
      password: "secure",
      photo: ""
    )

    visit "/"
  end

  context "with the full demo login" do
    it "fills in the form and logs in" do
      visit_page_with_seed_user
      click_button "Check Out the DEMO Account"
      expect(page).to have_text("⏎ Enter Adds A New Task")
    end
  end

  context "with the modal demo" do
    it "fills in the form and logs in" do
      visit_page_with_seed_user
      click_button "Register to Get Started"
      click_button "Demo User"
      expect(page).to have_text("⏎ Enter Adds A New Task")
    end
  end

  context "with the modal demo from the login button" do
    it "fills in the form and logs in" do
      visit_page_with_seed_user
      click_button "Log In"
      click_button "Demo User"
      expect(page).to have_text("⏎ Enter Adds A New Task")
    end
  end

  context "with the modal open" do
    it "can close the modal" do
      visit_page_with_seed_user
      click_button "Log In"
      expect(page).to have_text("Register or Log In")
      click_button "X"
      expect(page).not_to have_text("Register or Log In")
    end
  end
end
