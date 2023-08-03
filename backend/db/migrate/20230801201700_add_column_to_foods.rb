class AddColumnToFoods < ActiveRecord::Migration[7.0]
  def change
    add_column :foods, :target_age, :string
    add_column :foods, :rakuten_item_code, :string
    add_column :foods, :max_price, :integer
    add_column :foods, :median_price, :integer
    add_column :foods, :add_date, :datetime
  end
end
