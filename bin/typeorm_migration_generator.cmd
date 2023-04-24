@echo off
setlocal

set SCRIPT_PATH=%~dp0..\dist\index.js

"%~dp0..\node_modules\.bin\ts-node" "%SCRIPT_PATH%" %1

endlocal
