class User < ApplicationRecord
    has_secure_password
    has_many :songs
    has_many :interested_songs
end
