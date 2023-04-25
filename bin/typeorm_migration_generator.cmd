@echo off
setlocal

set SCRIPT_PATH=%~dp0..\dist\index.js
set DB_TYPE=mysql
set MIGRATION_NAME=

if "%1" == "--help" goto :help
if "%1" == "-h" goto :help
if "%1" == "" goto :help

:loop
	if "%1" == "-db" (
		set DB_TYPE=%2
		shift
		shift
		goto :loop
	) else if "%1" neq "" (
		set MIGRATION_NAME=%1
		echo %MIGRATION_NAME%
		shift
		goto :loop
	)

if "%MIGRATION_NAME%" == "" (
	goto :help
)

"%~dp0node_modules\.bin\ts-node" "%SCRIPT_PATH%" %MIGRATION_NAME% %DB_TYPE%

goto :exit

:help
	echo typeorm_migration_generator [migration_name] -db [database_type]
	echo.
	echo -h, --help        Print this help log
	echo -db               Choose the database type [mysql, pg, oracle, mariadb, mssql]

:exit

endlocal
