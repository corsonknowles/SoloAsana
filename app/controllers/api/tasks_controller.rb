# frozen_string_literal: true

class Api::TasksController < ApplicationController
  before_action :require_logged_in!

  def create
    @task = current_user.tasks.new(task_params)
    if @task.save
      render json: @task
    else
      render json: @task.errors.full_messages, status: :unprocessable_content
    end
  end

  def update
    @task = current_user.tasks.find(params[:id])
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors.full_messages, status: :unprocessable_content
    end
  end

  def destroy
    @task = current_user.tasks.find(params[:id])
    @task.destroy
    render json: @task
  end

  private

  def task_params
    params.expect(task: %i[id title body due done section project_id team_id user_id task_id])
  end
end
