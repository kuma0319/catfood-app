class CreateAmounts < ActiveRecord::Migration[7.0]
  def change
    create_table :amounts do |t|
      t.integer :amount
      t.integer :price
      t.references :food, null: false, foreign_key: true

      t.timestamps
    end
  end
end
