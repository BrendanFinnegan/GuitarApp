class User < ApplicationRecord
    has_secure_password
    has_many :songs
    has_many :interested_songs

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true
end
