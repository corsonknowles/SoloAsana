# frozen_string_literal: true

RSpec.describe "React Profile Photo", type: :system do
  context "with a valid login" do
    let(:user) { create(:user) }

    before do
      visit "/"

      click_button "Log In"
      fill_in "EMAIL ADDRESS", with: user.email
      fill_in "PASSWORD", with: user.password

      # rubocop:disable RSpec/ExpectInHook
      # auth the user
      click_button "Sign In"
      expect(page).to have_text("Welcome #{user.username}")
      expect(page).not_to have_text("My Profile Settings")

      # open the profile modal
      click_button "Account"
      expect(page).to have_text("My Profile Settings")

      # open the photo modal
      find("figure.profile-photo").click
      expect(page).to have_css(".inner-modal")
      expect(page).to have_text("Drop an image")
      expect(page).to have_text("Or, click to select a file to upload")
      # rubocop:enable RSpec/ExpectInHook
    end

    it "can close the dropzone and the account modal" do
      click_on(class: "inner-modal")
      expect(page).not_to have_text("Or, click to select a file to upload")

      click_button "Update Profile"
      expect(page).not_to have_text("My Profile Settings")
    end

    # WARNING: this integration test speaks to Cloudinary
    # Use Webmock and stub this if you do not want this integration test
    it "can upload files" do
      expect do
        expect(page).not_to have_css("img.profile-photo[src*='cloudinary']")

        file_path = "app/assets/images/favicon/apple-touch-icon.png"
        find("div input[type='file']", visible: false).set File.path(file_path)

        expect(page).not_to have_css(".inner-modal")
        expect(page).not_to have_text("Or, click to select a file to upload")

        expect(page).to have_text("Update profile photo")
        expect(page).to have_css("img.profile-photo[src*='cloudinary']")
        ActiveRecord::Base.after_transaction do
          click_button "Update Profile"
          expect(page).to have_text("Welcome #{user.username}")
        end
      end.to(change { user.reload.photo })
    end

    it "can open the dropzone file menu" do
      expect do
        find_by_id("profile-dropzone").click
        expect(page).to have_text("Drop an image")
      end.not_to raise_error
    end

    it "can reveal and set the hidden file input" do
      expect do
        page.execute_script(%{ $('input[type="file"]').show() })
        file_path = "app/assets/images/favicon/apple-touch-icon.png"
        find(:file_field).set File.path(file_path)

        expect(page).not_to have_css(".inner-modal")
        expect(page).not_to have_text("Or, click to select a file to upload")

        expect(page).to have_text("Update profile photo")
        expect(page).to have_css("img.profile-photo[src*='cloudinary']")
        ActiveRecord::Base.after_transaction do
          click_button "Update Profile"
          expect(page).to have_text("Welcome #{user.username}")
        end
      end.to(change { user.reload.photo })
    end
  end
end
