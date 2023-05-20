class CreateProductionAreas < ActiveRecord::Migration[7.0]
  def change
    create_table :production_areas do |t|
      t.string :production_area, null: false

      t.timestamps
    end

    add_index :production_areas, :production_area, unique: true
  end
end
