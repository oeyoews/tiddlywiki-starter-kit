Set WshShell = CreateObject("WScript.Shell")
command = "node lib/pm2-control.js"
WshShell.Run command, 0, False