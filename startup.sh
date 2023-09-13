#!/bin/sh
set -e

# /app/wiki -> ${PWD}/wiki
if [ ! -f ./wiki/tiddlywiki.info ]; then
    chmod 755 ./wiki
    cp ./tiddlywiki.info ./wiki/tiddlywiki.info
    chmod 755 ./wiki/tiddlywiki.info
    echo '更新 tiddlywiki.info 文件成功'
fi

# 必须要开局域网共享
# exec tiddlywiki --listen host=0.0.0.0 port=8080
exec "$@"
