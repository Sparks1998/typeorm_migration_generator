#!/bin/bash
BASE_PATH="$(dirname "$(readlink -f "$0")")"
SCRIPT_PATH="$BASE_PATH/../dist/index.js"
DB_TYPE=mysql
MIGRATION_NAME=""
tableName=
starterCode=1

while [ "$#" -gt 0 ]; do
    case "$1" in
        --help|-h|"")
            echo "typeorm_migration_generator [migration_name] -db [database_type]"
            echo ""
            echo "-h, --help        Print this help log"
            echo "-db               Choose the database type [mysql, pg, oracle, mariadb, mssql]"
            echo "-t, --table       Choose the table name in case you don't want to specify the name automatically"
            echo "-st, --starter    Choose if you want starter code or not [0 , 1](off, on) default is [1](on)"
            exit 1
            ;;
        -db)
            DB_TYPE=$2
            shift 2
            ;;
        -t|--table)
            tableName=$2
            shift 2
            ;;
        -st|--starter)
            starterCode=$2
            shift 2
            ;;
        *)
            MIGRATION_NAME=$1
            shift
            ;;
    esac
done

if [ -z "$MIGRATION_NAME" ]; then
  echo "typeorm_migration_generator [migration_name] -db [database_type]"
  echo ""
  echo "-h, --help        Print this help log"
  echo "-db               Choose the database type [mysql, pg, oracle, mariadb, mssql]"
  exit 1
fi

"$(dirname "$(readlink -f "$0")")/../node_modules/.bin/ts-node" "$SCRIPT_PATH" migration=$MIGRATION_NAME db=$DB_TYPE st=$starterCode t=$tableName
