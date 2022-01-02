# frozen_string_literal: true

RSpec.describe "React Profile Photo", type: :system do
  context "with a valid login" do
    let(:user) { create(:user) }

    before do
      visit "/"

      click_button "Log In"
      fill_in "EMAIL ADDRESS", with: user.email
      fill_in "PASSWORD", with: user.password

      click_button "Sign In"
    end

    it "can load the dropzone" do
      expect(page).to have_text("Welcome #{user.username}")

      click_button "Account"
      find("figure.profile-photo").click
      expect(page).to have_text("Drop an image")
      expect(page).to have_text("Or, click to select a file to upload")

      click_on(class: "inner-modal")
      click_button "Update Profile"
    end

    it "can open the dropzone file menu" do
      expect(page).to have_text("Welcome #{user.username}")

      click_button "Account"
      find("figure.profile-photo").click
      expect(page).to have_text("Drop an image")
      expect(page).to have_text("Or, click to select a file to upload")

      find_by_id("profile-dropzone").click
      # page.execute_script %{ $('input[type="file"]').show(); }
      # page.execute_script %{ $('input[type="file"]').enable(); }
      debugger

      page.attach_file('input[type="file"]', File.path("public/apple-touch-icon.png"))
    end

    it "can reveal the hidden file input" do
      expect(page).to have_text("Welcome #{user.username}")

      click_button "Account"
      find("figure.profile-photo").click
      expect(page).to have_text("Drop an image")
      expect(page).to have_text("Or, click to select a file to upload")

      page.execute_script %{ $('input[type="file"]').show(); }
      page.execute_script %{ $('input[type="file"]').enable(); }
      debugger

      page.attach_file('input[type="file"]', File.path("public/apple-touch-icon.png"))
    end

    it "can close the account modal" do
      expect(page).to have_text("Welcome #{user.username}")
      expect(page).not_to have_text("My Profile Settings")

      click_button "Account"
      expect(page).to have_text("My Profile Settings")

      click_on(class: "close-modal")
      expect(page).not_to have_text("My Profile Settings")
    end

    it "can upload files" do
      click_button "Account"
      find("figure.profile-photo").click

      expect(page).to have_css(".inner-modal")
      expect(page).to have_text("Drop an image")
      expect(page).to have_text("Or, click to select a file to upload")

      find("div input[type='file']", visible: false).set File.path("public/favicon.ico")
      expect(page).not_to have_css(".inner-modal")
      click_button "Update Profile"
    end
  end
end
