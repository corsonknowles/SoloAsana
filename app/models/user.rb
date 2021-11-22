class User < ApplicationRecord
  attr_reader :password

  validates :username, :email, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: :true

  after_initialize :ensure_session_token
  # after_touch :ensure_latest_project # TODO: add front end and then enable this

  has_many :tasks
  has_many :projects
  has_many :teams

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user if user&.password_is?(password)
  end

  def reset_session_token!
    set_unique_session!
    session_token
  end

  private

  def password_is?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def ensure_session_token
    set_unique_session! unless session_token
  end

  def ensure_latest_project
    unless latest_project
      unless self.projects.empty?
        self.latest_project = self.projects.first
      end
    end
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def set_unique_session!
    self.session_token = new_session_token
    while User.find_by(session_token: session_token)
      self.session_token = new_session_token
    end
    save!
  end
end
