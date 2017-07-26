class Api::ProjectsController < ApplicationController
  def create
    @project = current_user.projects.new(project_params)
    if @project.save
      render json: @project, include: :tasks
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def destroy
    @project = current_user.projects.find(params[:id])
    @project.destroy
    render json: @project, include: :tasks
  end

  def index
    render json: Project.all.where(user_id: current_user.id), include: :tasks
  end

  def show
    render json: Project.find(params[:id]), include: :tasks
  end

  def update
    @project = Project.find(params[:id])
    if @project.update(project_params)
      render json: @project, include: :tasks
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  private

  def project_params
    params.require(:project).permit(:name, :team, :user, :team_id, :user_id)
  end

end
