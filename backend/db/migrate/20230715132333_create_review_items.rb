class CreateReviewItems < ActiveRecord::Migration[7.0]
  def change
    create_table :review_items do |t|
      t.string :name

      t.timestamps

      t.index :name, unique: true
    end
  end
end
