#!/bin/sh
set -e

# /app/wiki -> ${PWD}/wiki
if [ -d ./wiki ]; then
  if [ ! -e ./wiki/tiddlywiki.info ]; then
    cp ./tiddlywiki.info ./wiki/tiddlywiki.info
    echo '更新 tiddlywiki.info 文件成功'
  fi
else
  mkdir -p ./wiki
  cp ./tiddlywiki.info ./wiki/tiddlywiki.info
  cp -r ./files ./wiki
  chmod 755 ./wiki
  echo '初始化 wiki 成功'
fi

# 必须要开局域网共享
# exec tiddlywiki --listen host=0.0.0.0 port=8080
exec "$@"
