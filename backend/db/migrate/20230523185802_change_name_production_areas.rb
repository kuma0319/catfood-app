class ChangeNameProductionAreas < ActiveRecord::Migration[7.0]
  def change
    rename_column :production_areas, :production_area, :name
  end
end
