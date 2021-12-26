# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: %i[create destroy update show]
    resources :tasks, only: %i[create destroy update]
    resources :projects, only: %i[create destroy update show index]

    resource :session, only: %i[create destroy]
  end

  root to: "static_pages#root"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
