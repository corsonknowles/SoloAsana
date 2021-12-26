# frozen_string_literal: true

class AddLatestProjectToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :latest_project, :integer
  end
end
