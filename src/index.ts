import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { dynamicColumnsString } from "./DynamicColumns";

const program = new Command ();

function pascalCaseToSnakeCase ( s : string ) : string {
	return s.replace ( /(?:^|\.?)([A-Z])/g , function ( x , y ) {
		return "_" + y.toLowerCase ()
	} ).replace ( /^_/ , "" );
}

function getStringNoMigrationWord ( name : string ) {
	return name.includes ( "Migration" ) ? name.substring ( 0 , name.indexOf ( "Migration" ) ) : name;
}

program.version ( '0.1.0' ).arguments ( '<name>' ).description ( 'Create a new TypeORM migration' ).action ( async ( name : string ) => {
	try {
		const timestamp = new Date ().getTime ();
		const directoryName = path.dirname ( name );
		const fileName = path.basename ( name );
		const migrationName = `${ timestamp }-${ fileName }.ts`;
		
		const template = `import { MigrationInterface , QueryRunner , Table } from "typeorm";
import { dynamicColumns } from "./DynamicColumns";

export class ${ fileName }${ timestamp } implements MigrationInterface {
	name = '${ pascalCaseToSnakeCase ( getStringNoMigrationWord ( fileName ) ).toLowerCase() }';
	
	public async up ( queryRunner : QueryRunner ) : Promise<void> {
		const table = new Table (
			{
				name : this.name ,
				// Extra columns to use add to the table.
				columns : dynamicColumns (
					[] ,
					"${ pascalCaseToSnakeCase ( getStringNoMigrationWord ( fileName ) ).toUpperCase () }_PRIMARY_KEY"
				) ,
			}
		);
		await queryRunner.createTable (
			table ,
			true ,
			true ,
			true
		);
	}
	
	public async down ( queryRunner : QueryRunner ) : Promise<void> {
		await queryRunner.dropTable ( this.name );
	}
}`;
		
		fs.mkdir (
			directoryName ,
			{
				recursive : true ,
			} ,
			( err ) => {
				if ( err ) {
					console.log ( err );
				} else {
					if ( ! fs.existsSync ( path.resolve ( directoryName , "DynamicColumns.ts" ) ) ) {
						fs.writeFileSync ( path.resolve ( directoryName , "DynamicColumns.ts" ) , dynamicColumnsString );
					}
					
					fs.writeFileSync ( path.resolve ( directoryName , `${ migrationName }` ) , template );
					console.log ( `Migration ${ migrationName } has been created.` );
				}
			}
		);
	} catch ( err ) {
		console.error ( err );
	}
} );

program.parse ( process.argv );
