class ChangeNameFoodTypes < ActiveRecord::Migration[7.0]
  def change
    rename_column :food_types, :food_type, :name
  end
end
