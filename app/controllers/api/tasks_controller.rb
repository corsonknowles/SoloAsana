class Api::TasksController < ApplicationController
  before_action :require_logged_in!

  def create
    @task = current_user.tasks.new(task_params)
    if @task.save
      render json: @task
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def destroy
    @task = current_user.tasks.find(params[:id])
    @task.destroy
    render json: @task
  end

  def index
    @tasks = current_user.tasks.where(project_id: params[:id])
    render :index
  end

  def show
    @task = current_user.find(params[:id])
    render :show
  end

  def update
    @task = current_user.tasks.find(params[:id])
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  private

  def task_params
    params.require(:task).permit(
      :title, :body, :due, :done, :section, :project_id, :project,
      :team, :user, :team_id, :user_id, :id, :task_id, :created_at, :updated_at
    )
  end
end
