#!/bin/sh
set -e

# Railsのserver.pidを削除(pidがあるとサーバー起動中と判断されるため)
rm -f /app/tmp/pids/server.pid

#コンテナのメインプロセスを実行
exec "$@"