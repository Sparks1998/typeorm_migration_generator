@echo off
setlocal

set BASE_PATH=%~dp0
set SCRIPT_PATH=%BASE_PATH%..\dist\index.js
set DB_TYPE=mysql
set tableName=
set MIGRATION_NAME=
set starterCode=1

if "%1" == "--help" goto :help
if "%1" == "-h" goto :help
if "%1" == "" goto :help

:loop
	if "%1" == "-db" (
		set DB_TYPE=%2
		shift
		shift
		goto :loop
	) else if "%1" == "--table" (
		goto :tableNameCommon
	) else if "%1" == "-t" (
		goto :tableNameCommon
	) else if "%1" == "--starter" (
		goto :starterCodeCommon
	) else if "%1" == "-st" (
		goto :starterCodeCommon
	) else if "%1" neq "" (
		set MIGRATION_NAME=%1
		shift
		goto :loop
	)

if "%MIGRATION_NAME%" == "" (
	goto :help
)

"%BASE_PATH%..\node_modules\.bin\ts-node" "%SCRIPT_PATH%" migration=%MIGRATION_NAME% db=%DB_TYPE% st=%starterCode% t=%tableName%

goto :exit

:help
	echo typeorm_migration_generator [migration_name] -db [database_type]
	echo.
	echo -h, --help         Print this help log
	echo -db                Choose the database type [mysql, pg, oracle, mariadb, mssql]
	echo -t, --table        Choose the table name in case you don't want to specify the name automatically
	echo -st, --starter     Choose if you want starter code or not [0 , 1](off, on) default is [1](on)
	goto :exit

:tableNameCommon
	set tableName=%2
	shift
	shift
	goto :loop

:starterCodeCommon
	set starterCode=%2
	shift
	shift
	goto :loop

:exit

endlocal
