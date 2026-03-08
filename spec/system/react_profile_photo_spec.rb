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
      expect(page).to have_css("h2.profile-title", text: "My Profile Settings")

      # open the photo modal
      find("figure.profile-photo").click
      expect(page).to have_css(".inner-modal")
      expect(page).to have_css(".instructions", text: "Drop an image")
      expect(page).to have_css(".instructions", text: "Or, click to select a file to upload")
      # rubocop:enable RSpec/ExpectInHook
    end

    it "can close the dropzone and the account modal" do
      click_on(class: "inner-modal")
      expect(page).not_to have_css(".instructions", text: "Or, click to select a file to upload")

      click_button "Update Profile"
      expect(page).not_to have_css("h2.profile-title")
    end

    # WARNING: this integration test speaks to Cloudinary
    # Use Webmock and stub this if you do not want this integration test
    it "can upload files" do
      expect do
        expect(page).not_to have_css("img.profile-photo[src*='cloudinary']")

        file_path = "app/assets/images/favicon/apple-touch-icon.png"
        find("div input[type='file']", visible: false).set File.path(file_path)

        expect(page).not_to have_css(".inner-modal")
        expect(page).not_to have_css(".instructions", text: "Or, click to select a file to upload")

        expect(page).to have_text("Update profile photo")
        expect(page).to have_css("img.profile-photo[src*='cloudinary']")
        ActiveRecord::Base.after_transaction do
          click_button "Update Profile"
          expect(page).to have_text("Welcome #{user.username}")
        end
      end.to(change { user.reload.photo })
    end

    it "opens the photo modal via Update profile photo button" do
      click_on(class: "inner-modal")
      expect(page).not_to have_css(".instructions", text: "Or, click to select a file to upload")

      click_button "Update profile photo"
      expect(page).to have_css(".instructions", text: "Drop an image")
      expect(page).to have_css(".instructions", text: "Or, click to select a file to upload")
    end

    it "can open the dropzone file menu" do
      expect do
        find_by_id("profile-dropzone").click
        expect(page).to have_css(".instructions", text: "Drop an image")
      end.not_to raise_error
    end

    it "handles upload error when Cloudinary request fails" do
      # Superagent v6 only uses onreadystatechange (not onerror), and reads
      # readyState/status directly off the XHR object (which are native
      # read-only properties — we can't fake them).
      #
      # The reliable approach: redirect the Cloudinary URL to a local port
      # that isn't listening.  Chrome immediately returns ECONNREFUSED, which
      # sets readyState=4 / status=0 — exactly the path superagent uses to
      # call crossDomainError() → callback(err) → setState({pending: false}).
      page.execute_script(<<~JS)
        (function() {
          if (window.__cloudinaryErrorTest) return;
          window.__cloudinaryErrorTest = true;

          var origOpen = XMLHttpRequest.prototype.open;
          XMLHttpRequest.prototype.open = function(method, url) {
            if (url && url.indexOf('cloudinary') !== -1) {
              url = 'http://127.0.0.1:49999/upload'; // nothing listens here
            }
            return origOpen.call(this, method, url);
          };
        })();
      JS

      file_path = "app/assets/images/favicon/apple-touch-icon.png"
      find("div input[type='file']", visible: false).set File.path(file_path)

      # The connection-refused error clears pending state; no cloudinary photo
      expect(page).to have_text("Update profile photo")
      expect(page).not_to have_css("img.profile-photo[src*='cloudinary']")
    end

    it "can reveal and set the hidden file input" do
      expect do
        page.execute_script("document.querySelector('input[type=\"file\"]').style.display = 'block'")
        file_path = "app/assets/images/favicon/apple-touch-icon.png"
        find(:file_field).set File.path(file_path)

        expect(page).not_to have_css(".inner-modal")
        expect(page).not_to have_css(".instructions", text: "Or, click to select a file to upload")

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
