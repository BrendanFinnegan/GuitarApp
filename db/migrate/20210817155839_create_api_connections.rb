class CreateApiConnections < ActiveRecord::Migration[6.1]
  def change
    create_table :api_connections do |t|

      t.timestamps
    end
  end
end
