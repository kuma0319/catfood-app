# json.arrayで@reviewsインスタンスの中身を配列で返す
json.array! @reviews do |review|
  # 他のモデルと紐づいていない要素と関連付けモデルのid情報を一括で指定
  json.extract! review, :id, :user_id, :food_id, :title, :content, :created_at, :updated_at

  # has_manyで関連付けられているevaluationsを指定
  json.evaluations do
    json.array! review.evaluations do |evaluation|
      json.id evaluation.id
      json.score evaluation.score
      json.review_item do
        json.extract! evaluation.review_item, :id, :name
      end
    end
  end
end
