# frozen_string_literal: true

class Api::SessionsController < ApplicationController
  before_action :require_logged_in!, only: [:destroy]

  def create
    @user = User.find_with_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      login(@user)
      render "api/users/show"
    else
      render(
        json: ["Invalid email/password combination"],
        status: :unauthorized
      )
    end
  end

  def destroy
    @user = current_user
    if @user
      logout
      render "api/users/show"
    else
      render(
        json: ["Nobody signed in"],
        status: :not_found
      )
    end
  end
end
