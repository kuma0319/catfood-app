class ChangeNameNutrients < ActiveRecord::Migration[7.0]
  def change
    rename_column :nutrients, :nutrient, :name
  end
end
