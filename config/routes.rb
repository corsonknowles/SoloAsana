# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: %i[create update show]
    resources :tasks, only: %i[create destroy update]
    resources :projects, only: %i[create destroy update show index]
    resources :teams, only: %i[index show create update destroy]

    resource :session, only: %i[create destroy]
  end

  # Fake Cloudinary upload endpoint — test environment only.
  # System specs redirect XHR calls for api.cloudinary.com here so photo
  # upload tests work without hitting the real Cloudinary API.
  if Rails.env.test?
    post "/cloudinary_upload_stub",
         to: "test_helpers/cloudinary_upload#create"
  end

  root to: "static_pages#root"

  # Catch-all: serve the React app for any non-API path so that
  # BrowserRouter can handle client-side navigation on direct load.
  get "*path", to: "static_pages#root", format: false
end
