@echo off
title starup tiddlywiki
pnpm pm2 delete tiddlywiki-starter-kit
pnpm pm2 start
exit
