# frozen_string_literal: true

RSpec.describe "TestHelpers::CloudinaryUploadController", type: :request do
  describe "POST /cloudinary_upload_stub" do
    it "returns Cloudinary-shaped JSON in test environment" do
      post "/cloudinary_upload_stub", params: {}

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json["secure_url"]).to include("cloudinary.com")
      expect(json["public_id"]).to eq("spec/test")
    end

    it "returns 404 when not in test environment" do
      allow(Rails.env).to receive(:test?).and_return(false)

      post "/cloudinary_upload_stub", params: {}

      expect(response).to have_http_status(:not_found)
    end
  end
end
