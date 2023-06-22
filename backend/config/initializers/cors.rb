# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # 開発環境と本番環境用に環境変数で設定したアドレスを適用
    origins ENV['ALLOWED_ORIGINS'].split(',')

    resource "*",
             headers: :any,
             expose: %w[access-token uid client],
             methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
