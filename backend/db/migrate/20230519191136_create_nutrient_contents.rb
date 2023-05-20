class CreateNutrientContents < ActiveRecord::Migration[7.0]
  def change
    create_table :nutrient_contents do |t|
      t.integer :nutrient_content
      t.references :food, null: false, foreign_key: true
      t.references :nutrient, null: false, foreign_key: true

      t.timestamps
    end
  end
end
