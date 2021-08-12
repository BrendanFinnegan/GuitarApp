class AddYearToSongs < ActiveRecord::Migration[6.1]
  def change
    remove_column :songs, :date_learned, :datetime
    add_column :songs, :year_learned, :integer
  end
end
