class ChangeNameBrands < ActiveRecord::Migration[7.0]
  def change
    rename_column :brands, :brand, :name
  end
end
