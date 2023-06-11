require 'rails_helper'

RSpec.describe "Api::V1::Foods::Foods", type: :request do
  describe "GET /index" do
    it "ステータスコード200が返ってくること" do
      get "/api/v1/foods/foods"
      expect(response).to have_http_status(200)
    end
  end
end
