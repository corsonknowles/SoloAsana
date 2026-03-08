# frozen_string_literal: true

class AddUniqueIndexToUsersSessionToken < ActiveRecord::Migration[8.0]
  def change
    add_index :users, :session_token, unique: true
  end
end
