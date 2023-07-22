class CreateEvaluations < ActiveRecord::Migration[7.0]
  def change
    create_table :evaluations do |t|
      t.references :review, null: false, foreign_key: true
      t.references :review_item, null: false, foreign_key: true
      t.integer :score

      t.timestamps
    end
  end
end
