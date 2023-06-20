class AddColumnsToFoods < ActiveRecord::Migration[7.0]
  def change
    add_column :foods, :rakuten_name, :string
    add_column :foods, :medium_image_url, :string
    add_column :foods, :min_price, :integer
  end
end
