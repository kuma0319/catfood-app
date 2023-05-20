class CreateFoodTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :food_types do |t|
      t.string :food_type, null: false

      t.timestamps
    end

    add_index :food_types, :food_type, unique: true
  end
end
