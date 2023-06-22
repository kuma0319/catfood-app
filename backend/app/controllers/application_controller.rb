class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
  # テスト用のAPIを追加
  def test
    # テスト用のJSON形式のオブジェクト
    test_json_obj = [
      { id: 1, title: "First Text", text: "最初のテキスト" },
      { id: 2, title: "Second Text", text: "2番目のテキスト" }
    ]

    # JSON形式で出力
    render json: test_json_obj
  end

  # deviseのメッセージの日本語化
  before_action do
    I18n.locale = :ja
  end
end
