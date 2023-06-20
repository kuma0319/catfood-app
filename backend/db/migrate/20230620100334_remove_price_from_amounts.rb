class RemovePriceFromAmounts < ActiveRecord::Migration[7.0]
  def change
    remove_column :amounts, :price, :integer
  end
end
