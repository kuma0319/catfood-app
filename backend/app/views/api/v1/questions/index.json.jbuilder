# json.arrayで@questionsインスタンスの中身を配列で返す
json.questions do
  json.array! @questions do |question|
    # 他のモデルと紐づいていない要素と関連付けモデルの情報を一括で指定
    json.extract! question, :id, :title, :content, :created_at, :updated_at

    # questionに紐づいているuserのデータを送る
    json.user do
      json.extract! question.user, :id, :nickname
      json.avatar_url question.user.avatar_url
    end
  end
end
