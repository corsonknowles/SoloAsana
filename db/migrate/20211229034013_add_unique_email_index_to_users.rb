class AddUniqueEmailIndexToUsers < ActiveRecord::Migration[6.1]
  def change
    remove_index :users, name: :index_users_on_email
    add_index :users, :email, unique: true
  end
end
