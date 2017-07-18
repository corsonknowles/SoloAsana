class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email, null: false, index: true
      t.string :password_digest, null: false
      t.string :session_token

      t.timestamps
    end
  end
end
