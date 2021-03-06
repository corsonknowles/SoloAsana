Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :destroy, :update]
    resources :tasks, only: [:create, :destroy, :update, :show, :index]
    resources :projects, only: [:create, :destroy, :update, :show, :index] do
      resources :tasks, only: [:show, :index]
    end
    resources :teams, only: [:create, :destroy, :update, :show] do
      resources :projects, only: [:show, :index] do
        resources :tasks, only: [:show]
      end
    end

    resource :session, only: [:create, :destroy]
  end

  root to: 'static_pages#root'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
