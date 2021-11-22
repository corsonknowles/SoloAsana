# == Route Map
#
#                Prefix Verb   URI Pattern                                                  Controller#Action
#             api_users POST   /api/users(.:format)                                         api/users#create {:format=>:json}
#              api_user PATCH  /api/users/:id(.:format)                                     api/users#update {:format=>:json}
#                       PUT    /api/users/:id(.:format)                                     api/users#update {:format=>:json}
#                       DELETE /api/users/:id(.:format)                                     api/users#destroy {:format=>:json}
#             api_tasks GET    /api/tasks(.:format)                                         api/tasks#index {:format=>:json}
#                       POST   /api/tasks(.:format)                                         api/tasks#create {:format=>:json}
#              api_task GET    /api/tasks/:id(.:format)                                     api/tasks#show {:format=>:json}
#                       PATCH  /api/tasks/:id(.:format)                                     api/tasks#update {:format=>:json}
#                       PUT    /api/tasks/:id(.:format)                                     api/tasks#update {:format=>:json}
#                       DELETE /api/tasks/:id(.:format)                                     api/tasks#destroy {:format=>:json}
#     api_project_tasks GET    /api/projects/:project_id/tasks(.:format)                    api/tasks#index {:format=>:json}
#      api_project_task GET    /api/projects/:project_id/tasks/:id(.:format)                api/tasks#show {:format=>:json}
#          api_projects GET    /api/projects(.:format)                                      api/projects#index {:format=>:json}
#                       POST   /api/projects(.:format)                                      api/projects#create {:format=>:json}
#           api_project GET    /api/projects/:id(.:format)                                  api/projects#show {:format=>:json}
#                       PATCH  /api/projects/:id(.:format)                                  api/projects#update {:format=>:json}
#                       PUT    /api/projects/:id(.:format)                                  api/projects#update {:format=>:json}
#                       DELETE /api/projects/:id(.:format)                                  api/projects#destroy {:format=>:json}
# api_team_project_task GET    /api/teams/:team_id/projects/:project_id/tasks/:id(.:format) api/tasks#show {:format=>:json}
#     api_team_projects GET    /api/teams/:team_id/projects(.:format)                       api/projects#index {:format=>:json}
#      api_team_project GET    /api/teams/:team_id/projects/:id(.:format)                   api/projects#show {:format=>:json}
#             api_teams POST   /api/teams(.:format)                                         api/teams#create {:format=>:json}
#              api_team GET    /api/teams/:id(.:format)                                     api/teams#show {:format=>:json}
#                       PATCH  /api/teams/:id(.:format)                                     api/teams#update {:format=>:json}
#                       PUT    /api/teams/:id(.:format)                                     api/teams#update {:format=>:json}
#                       DELETE /api/teams/:id(.:format)                                     api/teams#destroy {:format=>:json}
#           api_session DELETE /api/session(.:format)                                       api/sessions#destroy {:format=>:json}
#                       POST   /api/session(.:format)                                       api/sessions#create {:format=>:json}
#                  root GET    /                                                            static_pages#root

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
