#!/bin/bash
SCRIPT_PATH="$(dirname "$(readlink -f "$0")")/../dist/index.js"
DB_TYPE=mysql
MIGRATION_NAME=""

while [ "$#" -gt 0 ]; do
    case "$1" in
        --help|-h|"")
            echo "typeorm_migration_generator [migration_name] -db [database_type]"
            echo ""
            echo "-h, --help        Print this help log"
            echo "-db               Choose the database type [mysql, pg, oracle, mariadb, mssql]"
            exit
            ;;
        -db)
            DB_TYPE=$2
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

"$(dirname "$(readlink -f "$0")")/../node_modules/.bin/ts-node" "$SCRIPT_PATH" $MIGRATION_NAME $DB_TYPE
