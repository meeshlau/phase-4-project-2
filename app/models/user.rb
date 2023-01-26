class User < ApplicationRecord
    has_secure_password

    has_many :books
    has_many :reviews, through: :books
    has_many :reviews

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true
end
