class InterestedSongSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :artist, :genre
end
