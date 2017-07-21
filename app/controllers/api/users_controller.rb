class Api::UsersController < ApplicationController
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
    puts session[:session_token]
    if @user.update_attributes(update_params)
      render :show
      puts session[:session_token]
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
      :about
    )
  end

  def update_params
    params.require(:user).permit(
      :username,
      :photo,
      :role,
      :department,
      :about
    )
  end
end
