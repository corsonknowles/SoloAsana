# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  about           :string
#  department      :string
#  email           :string           not null
#  latest_project  :integer
#  password_digest :string           not null
#  photo           :string
#  role            :string
#  session_token   :string
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email)
#
class User < ApplicationRecord
  attr_reader :password

  validates :username, presence: true, length: { maximum: 256 }
  validates :email, presence: true
  validates :password_digest, presence: true
  validates :session_token, presence: true
  validates :email, uniqueness: true, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  after_initialize :ensure_session_token
  before_validation :truncate_username
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

  def password_is?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_session_token!
    set_unique_session!
    save!
    session_token
  end

  private

  def truncate_username
    return unless username
    return unless username.length > 255

    self.username = username.truncate(255)
  end

  def ensure_session_token
    set_unique_session! unless session_token
  end

  # NOTE: feature under development
  # def ensure_latest_project
  #   return if latest_project
  #   return if projects.empty?
  #
  #   self.latest_project = projects.last
  # end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def set_unique_session!
    self.session_token = new_session_token
    while User.find_by(session_token: session_token)
      self.session_token = new_session_token
    end
  end
end
