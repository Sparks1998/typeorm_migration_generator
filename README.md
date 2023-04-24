This package is for generating typeorm migration according to provided path.

# Usage

```bash
# Install package
$ yarn global add typeorm_migration_generator

# Generate migration with a DynamicColumns variable in a separate file
# to use it everywhere in your migrations.
# Default database is mysql.
$ typeorm_migration_generator src/migrations/UsersMigration -db pg
```

# Result

The above commands will install the package globally at your PC and generate your needed migration according
to the specified location given

# Add support for more databases
Added more support for databases (mysql, postgres, oracle, mariadb, mssql)

### Database names selecting:
```bash
# database names: mysql, pg, oracle, mariadb, mssql
$ typeorm_migration_generator src/migrations/UsersMigration -db [mysql, pg, oracle, mariadb, mssql]
```
