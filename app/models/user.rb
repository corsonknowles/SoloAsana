class User < ApplicationRecord
  attr_reader :password

  validates :username, :email, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: :true

  after_initialize :ensure_session_token

  has_many :tasks
  has_many :projects
  has_many :teams

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.password_is?(password) ? user : nil
  end

  def password_is?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_session_token!
    ensure_session_token_uniqueness
    save!
    session_token
  end

  private

  def ensure_session_token
    ensure_session_token_uniqueness unless session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def ensure_session_token_uniqueness
    self.session_token = new_session_token
    while User.find_by(session_token: session_token)
      self.session_token = new_session_token
    end
    session_token
  end
end
