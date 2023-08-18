# 他のモデルと紐づいていない要素と関連付けモデルの情報を一括で指定
json.extract! @question, :id, :title, :content, :created_at, :updated_at

# @questionに紐づいているuserのデータを送る
json.user do
  json.extract! @question.user, :id, :nickname
  json.avatar_url @question.user.avatar_url
end

# @questionに紐づいているanswers(全回答)とその回答が保有しているuserデータを含める
json.answers @question.answers do |answer|
  json.extract! answer, :id, :content, :created_at, :updated_at

  json.user do
    json.extract! answer.user, :id, :nickname
    json.avatar_url answer.user.avatar_url
  end
end
