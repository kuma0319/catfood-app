class ChangeDataTypeNutrientContents < ActiveRecord::Migration[7.0]
  def change
    change_column :nutrient_contents, :content, :float
  end
end
