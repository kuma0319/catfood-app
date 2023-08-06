#!/bin/sh
set -e

# Railsのserver.pidを削除(pidがあるとサーバー起動中と判断されるため)
rm -f /app/tmp/pids/server.pid

# prodction環境のみ初期データの投入
if [ "$RAILS_ENV" = "production" ]; then
# 本番環境への初回デプロイ時にのみ利用
bundle exec rails db:create
# 2回目以降のデプロイ時に利用
# bundle exec rails db:migrate
fi

#コンテナのメインプロセスを実行
exec "$@"