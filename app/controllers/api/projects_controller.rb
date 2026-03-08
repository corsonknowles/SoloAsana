# frozen_string_literal: true

class Api::ProjectsController < ApplicationController
  before_action :require_logged_in!

  def index
    @projects = current_user.projects.includes(:tasks)
    render json: @projects, include: :tasks
  end

  def show
    @project = current_user.projects.includes(:tasks).find(params[:id])
    render json: @project, include: :tasks
  end

  def create
    @project = current_user.projects.new(project_params)
    if @project.save
      render json: @project
    else
      render json: @project.errors.full_messages, status: :unprocessable_content
    end
  end

  def update
    @project = current_user.projects.find(params[:id])
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors.full_messages, status: :unprocessable_content
    end
  end

  def destroy
    @project = current_user.projects.find(params[:id])
    if @project.destroy
      render json: @project
    else
      render json: @project.errors.full_messages, status: :unprocessable_content
    end
  end

  private

  def project_params
    params.expect(project: %i[name team_id user_id])
  end
end
