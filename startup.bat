@echo off
title starup tiddlywiki
pnpm pm2 stop tiddlywiki-starter-kit
pnpm pm2 start
exit
