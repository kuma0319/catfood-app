#!/bin/sh
set -e

# Railsのserver.pidを削除(pidがあるとサーバー起動中と判断されるため)
rm -f /app/tmp/pids/server.pid

# prodction環境のみ初期データの投入
if [ "$RAILS_ENV" = "production" ]; then
bundle exec rake db:reset
# bundle exec rake db:migrate
# bundle exec rails db:seed
fi

#コンテナのメインプロセスを実行
exec "$@"