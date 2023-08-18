title = "これはデモレビューです。"
content = "これはデモレビューです。これはデモレビューです。これはデモレビューです。これはデモレビューです。これはデモレビューです。
これはデモレビューです。これはデモレビューです。これはデモレビューです。これはデモレビューです。これはデモレビューです。これはデモレビューです。"

user = User.find_by(email: "demo5@example.com")

# 全てのフードに対してでもレビューを追加
Food.all.each do |food|
  review = Review.new(
    title:,
    content:,
    user_id: user.id,
    food_id: food.id
  )

  ReviewItem.all.each do |review_item|
    review.evaluations.new(
      review_item_id: review_item.id,
      score: rand(1..5) # スコアは1から5の間でランダム
    )
  end
  review.save
end