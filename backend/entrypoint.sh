#!/bin/sh
set -e

# Railsのserver.pidを削除(pidがあるとサーバー起動中と判断されるため)
rm -f /app/tmp/pids/server.pid

# 初期データの投入
bundle exec rake db:migrate
bundle exec rails db:seed

#コンテナのメインプロセスを実行
exec "$@"