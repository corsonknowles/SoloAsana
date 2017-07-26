class Team < ApplicationRecord
  belongs_to :user
  has_many :projects
  has_many :tasks
end
