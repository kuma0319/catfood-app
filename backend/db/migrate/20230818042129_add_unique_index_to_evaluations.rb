class AddUniqueIndexToEvaluations < ActiveRecord::Migration[7.0]
  def change
    add_index :evaluations, [:review_item_id, :review_id], unique: true
  end
end
