Rails.application.routes.draw do
  namespace "api" do
    namespace "v1" do
      namespace "foods" do
        resources :foods, only: [:index, :show]
        get 'index_ids', to: 'foods#index_ids'
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

      resources :questions, only: [:index, :show, :create, :destroy]
      get "user_questions", to: "questions#index_user_questions"
      resources :answers, only: [:index, :show, :create, :destroy]

      # devise_token_authのregistrationsコントローラとconfirmationsコントローラはオーバーライド
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
        confirmations: "api/v1/auth/confirmations"
      }
    end
  end
end
