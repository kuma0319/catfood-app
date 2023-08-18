5.times do |i|
  user = User.new(
    email: "demo#{i + 1}@example.com",
    password: "password",
    nickname: "デモユーザー#{i + 1}"
  )
  user.confirmed_at = Time.now # Confirmable を使用している場合は必要
  user.save!
end