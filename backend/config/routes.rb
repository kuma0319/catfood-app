Rails.application.routes.draw do
  namespace "api" do
    namespace "v1" do
      namespace "foods" do
        resources :amounts, :brands, :food_types, :foods, :nutrient_contents, :nutrients, :production_areas
        get 'search', to: 'foods#search'
        get 'watch_lists', to: 'watch_lists#index'
      end
      mount_devise_token_auth_for 'User', at: 'auth'
    end
  end
end
