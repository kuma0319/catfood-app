class CreateTargetAges < ActiveRecord::Migration[7.0]
  def change
    create_table :target_ages do |t|
      t.string :name, null: false
      t.timestamps
    end
    remove_column :foods, :target_age, :string
    add_reference :foods, :target_age, foreign_key: true
  end
end
