# frozen_string_literal: true

RSpec.describe "React Register", type: :system do
  let(:email) { "my.example@example.com" }
  let(:password) { "secure" }

  context "with a new registration" do
    before do
      visit "/"

      click_button "Register to Get Started"
      fill_in "EMAIL ADDRESS", with: email
      fill_in "PASSWORD", with: password
    end

    it "creates a user and logs in" do
      expect do
        click_button "Register"
        expect(page).to have_text("⏎ Enter Adds A New Task")
      end.to change { User.count }.by(1)
    end

    context "with an insufficient password" do
      let(:password) { "1" }

      it "renders errors" do
        expect do
          click_button "Register"
          expect(page).to have_text("too short")
        end.to change { User.count }.by(0)
      end
    end
  end
end
