Set objShell = CreateObject("WScript.Shell")
objShell.Run "node lib/pm2-control.js", 0, False
