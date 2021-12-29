# frozen_string_literal: true

class Api::ProjectsController < ApplicationController
  before_action :require_logged_in!

  def create
    @project = current_user.projects.new(project_params)
    if @project.save
      render json: @project
    else
      render json: @project.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @project = current_user.projects.find(params[:id])
    @project.destroy
    render json: @project
  end

  def index
    @projects = current_user.projects.includes(:tasks)
    render json: @projects, include: :tasks
  end

  def show
    @project = current_user.projects.includes(:tasks).find(params[:id])
    render json: @project, include: :tasks
  end

  def update
    @project = current_user.projects.find(params[:id])
    if @project.update(update_params)
      render json: @project
    else
      render json: @project.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def project_params
    params.require(:project).permit(:name, :team, :user, :team_id, :user_id, :created_at, :updated_at)
  end

  def update_params
    params.require(:project).permit(:name, :team, :user, :team_id, :user_id, :created_at, :updated_at)
  end
end
