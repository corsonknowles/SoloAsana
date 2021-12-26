Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :destroy, :update, :show]
    resources :tasks, only: [:create, :destroy, :update]
    resources :projects, only: [:create, :destroy, :update, :show, :index]

    resource :session, only: [:create, :destroy]
  end

  root to: 'static_pages#root'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
