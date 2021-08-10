class CreateInterestedSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :interested_songs do |t|
      t.string :user_id
      t.string :title
      t.string :artist
      t.string :genre

      t.timestamps
    end
  end
end
