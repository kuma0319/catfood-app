class CreateNutrients < ActiveRecord::Migration[7.0]
  def change
    create_table :nutrients do |t|
      t.string :nutrient, null: false

      t.timestamps
    end

    add_index :nutrients, :nutrient, unique: true
  end
end
