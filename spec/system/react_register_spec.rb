# frozen_string_literal: true

RSpec.describe "React Register", type: :system do
  let(:email) { "my.example@example.com" }

  context "with a new registration" do
    before do
      visit "/"

      click_button "Register to Get Started"
      fill_in "EMAIL ADDRESS", with: email
      fill_in "PASSWORD", with: "secure"
    end

    it "creates a user and logs in" do
      expect do
        click_button "Register"
        expect(page).to have_text("⏎ Enter Adds A New Task")
      end.to change { User.count }.by(1)
    end
  end
end
