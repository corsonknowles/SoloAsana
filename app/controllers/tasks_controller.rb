class TasksController < ApplicationController
  def create
    @task = current_user.tasks.new(task_params)
    if @task.save
      render json: @task, include: :tasks
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
    render json: Task.all.where(user_id: current_user.id)
  end

  def show
    render json: Task.find(params[:id])
  end

  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors.full_messages, status: 422
    end
  end


  private
  def task_params
    params.require(:task).permit(:title, :body, :due, :done, :user_id, :project_id, :team_id, :section, :task_id )
  end

end
