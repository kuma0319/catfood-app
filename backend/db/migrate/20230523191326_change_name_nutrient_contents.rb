class ChangeNameNutrientContents < ActiveRecord::Migration[7.0]
  def change
    rename_column :nutrient_contents, :nutrient_content, :content
  end
end
