#!/bin/sh
set -e

if [ ! -f /app/tiddlywiki.info ]; then
  cp /resources/tiddlywiki.info .
  cp -r /resources/files .
  echo '初始化 wiki 成功'
fi

# 必须要开局域网共享
# exec tiddlywiki --listen host=0.0.0.0 port=8080
exec tiddlywiki "$@"
