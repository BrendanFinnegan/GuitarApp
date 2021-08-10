class CreateSongs < ActiveRecord::Migration[6.1]
  def change
    create_table :songs do |t|
      t.integer :user_id
      t.string :title
      t.string :artist
      t.string :genre
      t.string :lyrics
      t.datetime :date_learned
      t.float :my_ability_level
      t.boolean :singable
      t.string :tabs
      t.string :notes
      t.string :recording

      t.timestamps
    end
  end
end
