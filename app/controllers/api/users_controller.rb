class Api::UsersController < ApplicationController
  before_action :require_logged_in!, only: [:show, :update]

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = current_user
    if @user.update(update_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :username,
      :email,
      :password,
      :photo,
      :role,
      :department,
      :about,
      :latest_project
    )
  end

  def update_params
    params.require(:user).permit(
      :username,
      :photo,
      :role,
      :department,
      :about,
      :latest_project
    )
  end
end
