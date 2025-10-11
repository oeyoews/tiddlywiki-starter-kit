@echo off
title starup tiddlywiki
start /b node lib/pm2-control.js
exit

@REM press win+r shortcut, and type `shell:startup`, then copy start.bat to this folder for automatic startup