Rails.application.routes.draw do
  namespace "api" do
    namespace "v1" do
      namespace "foods" do
        resources :amounts, :brands, :food_types, :foods, :nutrient_contents, :nutrients, :production_areas
      end
    end
  end
end
