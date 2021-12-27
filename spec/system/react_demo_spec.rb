# frozen_string_literal: true

RSpec.describe "React Demo Sign In", type: :system do
  context "with the full demo login" do
    let!(:user) do
      create(
        :user,
        email: "awesome.user@example.com", # match the seed user
        username: "Robert",
        password: "secure",
        photo: ""
      )
    end

    before do
      visit "/"

      click_button "Check Out the DEMO Account"
    end

    it "fills in the form and logs in" do
      expect(page).to have_text("⏎ Enter Adds A New Task")
    end
  end

  context "with the modal demo" do
    let!(:user) do
      create(
        :user,
        email: "awesome.user@example.com", # match the seed user
        username: "Robert",
        password: "secure",
        photo: ""
      )
    end

    before do
      visit "/"

      click_button "Register to Get Started"
      click_button "Demo User"
    end

    it "fills in the form and logs in" do
      expect(page).to have_text("⏎ Enter Adds A New Task")
    end
  end

  context "with the modal demo from the login button" do
    let!(:user) do
      create(
        :user,
        email: "awesome.user@example.com", # match the seed user
        username: "Robert",
        password: "secure",
        photo: ""
      )
    end

    before do
      visit "/"

      click_button "Log In"
      click_button "Demo User"
    end

    it "fills in the form and logs in" do
      expect(page).to have_text("⏎ Enter Adds A New Task")
    end
  end

  context "with the modal open" do
    let!(:user) do
      create(
        :user,
        email: "awesome.user@example.com", # match the seed user
        username: "Robert",
        password: "secure",
        photo: ""
      )
    end

    before do
      visit "/"

      click_button "Log In"
    end

    it "can close the modal" do
      expect(page).to have_text("Register or Log In")
      click_button "X"
      expect(page).not_to have_text("Register or Log In")
    end
  end
end
