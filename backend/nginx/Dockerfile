#軽量のalpine版のnginx
FROM nginx:alpine

#設定ディレクトリ内の既存ファイルを削除
RUN rm -f /etc/nginx/conf.d/*

#nginx.confをコンテナにコピー
ADD ./nginx.conf /etc/nginx/conf.d/nginx.conf

#コンテナ起動時にフォアグラウンドでnginx起動
CMD /usr/sbin/nginx -g 'daemon off;' -c /etc/nginx/nginx.conf