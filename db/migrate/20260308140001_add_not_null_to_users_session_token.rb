# frozen_string_literal: true

class AddNotNullToUsersSessionToken < ActiveRecord::Migration[8.1]
  def up
    # Backfill any NULL session_tokens before adding constraint
    User.where(session_token: nil).find_each do |user|
      user.update_column(:session_token, SecureRandom.urlsafe_base64(32))
    end
    change_column_null :users, :session_token, false
  end

  def down
    change_column_null :users, :session_token, true
  end
end
