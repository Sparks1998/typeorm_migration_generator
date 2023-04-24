@echo off
setlocal

set SCRIPT_PATH=%~dp0..\dist\index.js
set DB_TYPE=mysql
set MIGRATION_NAME=

:loop
if "%1" == "-db" (
	set DB_TYPE=%2
	shift
	shift
	goto :loop
) else if "%1" neq "" (
	set MIGRATION_NAME=%1
	shift
	goto :loop
)

"%~dp0node_modules\.bin\ts-node" "%SCRIPT_PATH%" %MIGRATION_NAME% %DB_TYPE%

endlocal
