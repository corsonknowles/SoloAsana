# frozen_string_literal: true

# Only reachable in the test environment (route is guarded by Rails.env.test?).
# Returns a minimal Cloudinary-shaped JSON response so system specs that
# exercise photo upload work without a real Cloudinary account or network.
class TestHelpers::CloudinaryUploadController < ApplicationController
  before_action :ensure_test_env
  skip_before_action :verify_authenticity_token

  def create
    render json: {
      secure_url: "https://res.cloudinary.com/test/image/upload/v1/spec/test.jpg",
      public_id: "spec/test",
      format: "jpg",
      version: 1
    }
  end

  private

  def ensure_test_env
    head :not_found and return unless Rails.env.test?
  end
end
