class AddIndexToFoodsName < ActiveRecord::Migration[7.0]
  def change
    add_index :foods, :name, unique: true
  end
end
