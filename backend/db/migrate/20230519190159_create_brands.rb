class CreateBrands < ActiveRecord::Migration[7.0]
  def change
    create_table :brands do |t|
      t.string :brand, null: false

      t.timestamps
    end

    add_index :brands, :brand, unique: true
  end
end
