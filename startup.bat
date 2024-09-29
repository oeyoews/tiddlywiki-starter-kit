@echo off
title starup tiddlywiki
start /b node lib/pm2-control.js
exit

@REM shell:startup to copy start.bat