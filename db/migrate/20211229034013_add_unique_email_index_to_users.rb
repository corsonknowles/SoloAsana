# frozen_string_literal: true

class AddUniqueEmailIndexToUsers < ActiveRecord::Migration[6.1]
  def change
    remove_index :users, column: :email, name: :index_users_on_email
    add_index :users, :email, unique: true
  end
end
