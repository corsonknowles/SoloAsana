# frozen_string_literal: true

class Api::TeamsController < ApplicationController
  before_action :require_logged_in!

  def index
    render json: current_user.teams.includes(:projects), include: :projects
  end

  def show
    render json: current_user.teams.find(params[:id]), include: :projects
  end

  def create
    @team = current_user.teams.new(team_params)
    if @team.save
      render json: @team, include: :projects
    else
      render json: @team.errors.full_messages, status: :unprocessable_content
    end
  end

  def update
    @team = Team.find(params[:id])
    if @team.update(team_params)
      render json: @team, include: :projects
    else
      render json: @team.errors.full_messages, status: :unprocessable_content
    end
  end

  def destroy
    @team = current_user.teams.find(params[:id])
    @team.destroy
    render json: @team, include: :projects
  end

  private

  def team_params
    params.require(:team).permit(:name, :user, :user_id)
  end
end
