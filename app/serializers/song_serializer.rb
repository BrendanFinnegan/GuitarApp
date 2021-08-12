class SongSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :artist, :genre, :lyrics, :year_learned, :my_ability_level, :singable, :tabs, :notes, :recording
end
