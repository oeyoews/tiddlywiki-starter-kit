#!/bin/sh
set -e

# /app/tiddlywiki -> ${PWD}/tiddlywiki
if [ ! -f ./tiddlywiki/tiddlywiki.info ]; then
  cp ./tiddlywiki.info ./tiddlywiki
  cp -r ./files ./tiddlywiki
  echo '初始化 wiki 成功'
fi

# 必须要开局域网共享
# exec tiddlywiki --listen host=0.0.0.0 port=8080
exec "$@"
