#!/usr/bin/env bash

tiddlywiki_script=$(readlink -f $(which tiddlywiki))

listen_params="host=0.0.0.0 port=8080"

# 挂载卷需要是一个空的目录, 不能有文件, 否则 init 会报错
if [ ! -f /app/tiddlywiki.info ]; then
  # /usr/bin/env node $tiddlywiki_script wiki --init server
  cp /resources/tiddlywiki.info .
  cp -r /resources/files .
  echo '初始化 wiki 成功'
fi

# 如果这个目录被挂在, 这个目录里面的内容是本地工作目录的
exec /usr/bin/env node $tiddlywiki_script --listen $listen_params
# exec /usr/bin/env node $tiddlywiki_script ./ --build index
