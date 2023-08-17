class AddUniqueIndexToAmountAndNutrientContent < ActiveRecord::Migration[7.0]
  def change
    add_index :nutrient_contents, [:food_id, :nutrient_id], unique: true
    add_index :amounts, [:food_id, :amount], unique: true
  end
end
