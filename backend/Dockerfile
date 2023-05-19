## ビルドステージ
#23/5/16時点でのruby公式の推奨バージョンのalppine版
FROM ruby:3.2.2-alpine3.18 AS builder

# 言語とタイムゾーンの設定
ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

RUN mkdir /app
WORKDIR /app

# インストール可能なパッケージ一覧の更新
RUN apk update && \
    #パッケージインストール
    apk add --no-cache\
    alpine-sdk \
    build-base \
    sqlite-dev \
    postgresql-dev \
    tzdata \
    git \
    gcompat

#GemfileとGemfile.lockをapp内にコピー
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock

#最新版のbundlerを使用し、bundler-vでバージョン確認しておく
RUN gem install bundler
RUN bundle -v
RUN bundle install


##マルチステージビルド
FROM ruby:3.2.2-alpine3.18

ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

#開発環境用のRAILS_ENVを設定
ENV RAILS_ENV=development

RUN apk update && \
    apk add --no-cache\
    bash \
    sqlite-dev \
    postgresql-dev \
    tzdata \
    git \
    gcompat

RUN mkdir /app
WORKDIR /app

#ビルドステージからファイルコピー
COPY --from=builder /usr/local/bundle /usr/local/bundle
COPY . /app

# puma.sockの配置用ディレクトリ作成
RUN mkdir -p tmp/sockets

RUN mkdir -p /app/tmp/pids/

# Nginxへのファイル共有用ボリューム
VOLUME /app/public
VOLUME /app/tmp

# コンテナ起動時に実行するスクリプト
COPY ./entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3010
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]