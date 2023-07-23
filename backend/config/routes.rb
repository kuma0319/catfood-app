Rails.application.routes.draw do
  namespace "api" do
    namespace "v1" do
      namespace "foods" do
        resources :amounts, :brands, :food_types, :foods, :nutrient_contents, :nutrients, :production_areas
        get "search", to: "foods#search"
        get "watch_lists", to: "watch_lists#index"
      end
      namespace "users" do
        get "users", to: "users#index"
      end

      # ユーザーが個々のfavoriteにアクセスすることは無いから単数形resource
      resource :favorites, only: [:show, :create, :destroy]
      get "favorite_food_ids", to: "favorites#show_food_ids"

      resources :reviews
      get "user_reviews", to: "reviews#index_user_reviews"

      resources :questions
      resources :answers

      # devise_token_authのregistrationsコントローラはオーバーライド
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations"
      }
    end
  end
end
