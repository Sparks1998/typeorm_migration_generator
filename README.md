This package is for generating typeorm migration according to provided path.

# Usage

```bash
# Install package
$ yarn global add typeorm_migration_generator_2

# Generate migration with a DynamicColumns variable in a separate file
# to use it everywhere in your migrations.
# Default database is mysql.
$ typeorm_migration_generator_2 src/migrations/UsersMigration -db pg
```

# Result

The above commands will install the package globally at your PC and generate your needed migration according
to the specified location given

# Add support for more databases
Added more support for databases (mysql, postgres, oracle, mariadb, mssql)

### Database names selecting:
```bash
# database names: mysql, pg, oracle, mariadb, mssql
$ typeorm_migration_generator_2 src/migrations/UsersMigration -db [mysql(Default), pg, oracle, mariadb, mssql]
```

### Add support to choose whether to add or remove starter code.
```bash
# database names: mysql, pg, oracle, mariadb, mssql
$ typeorm_migration_generator_2 src/migrations/UsersMigration -st [0,1](off, on)
$ typeorm_migration_generator_2 src/migrations/UsersMigration -starter [0,1(Default)](off, on)
```

### Add support to specify a custom table name.
```bash
# database names: mysql, pg, oracle, mariadb, mssql
$ typeorm_migration_generator_2 src/migrations/UsersMigration -t [table-name]
$ typeorm_migration_generator_2 src/migrations/UsersMigration -table [table-name]
```

The name specified in the above commands will be used exactly as table name.
