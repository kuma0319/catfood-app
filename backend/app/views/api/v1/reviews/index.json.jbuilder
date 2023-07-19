# json.arrayで@reviewsインスタンスの中身を配列で返す
json.reviews do
  json.array! @reviews do |review|
    # 他のモデルと紐づいていない要素と関連付けモデルの情報を一括で指定
    json.extract! review, :id, :food_id, :title, :content, :created_at, :updated_at

    # userのデータはavatar_urlも含めて送る
    json.user do
      json.extract! review.user, :id, :nickname
      json.avatar_url review.user.avatar_url
    end

    # has_manyで関連付けられているevaluationsを指定
    json.evaluations do
      json.array! review.evaluations do |evaluation|
        json.score evaluation.score
        json.review_item do
          json.extract! evaluation.review_item, :id, :name
        end
      end
    end
  end
end

  # スコアの平均を返す
  json.average_scores Evaluation.average_scores(params[:food_id])
