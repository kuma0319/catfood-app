class CreateFoods < ActiveRecord::Migration[7.0]
  def change
    create_table :foods do |t|
      t.string :name, null: false
      t.string :image
      t.text :ingredients
      t.references :brand, null: false, foreign_key: true
      t.references :production_area, null: false, foreign_key: true
      t.references :food_type, null: false, foreign_key: true
      t.integer :calorie

      t.timestamps
    end
  end
end
