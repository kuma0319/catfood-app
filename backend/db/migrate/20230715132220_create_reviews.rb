class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.references :food, null: false, foreign_key: true
      t.string :title
      t.text :content

      t.timestamps

      t.index [:user_id, :food_id], unique: true
    end
  end
end
