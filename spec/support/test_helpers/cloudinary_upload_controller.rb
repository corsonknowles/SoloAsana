# frozen_string_literal: true

# Stub controller for photo upload system specs. Lives in spec/ so it is never
# loaded in production or development. Returns minimal Cloudinary-shaped JSON
# so specs work without a live Cloudinary account or network.
module TestHelpers
  class CloudinaryUploadController < ApplicationController
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
end
