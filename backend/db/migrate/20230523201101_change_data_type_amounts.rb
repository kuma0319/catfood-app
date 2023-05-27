class ChangeDataTypeAmounts < ActiveRecord::Migration[7.0]
  def change
    change_column :amounts, :amount, :float
  end
end
