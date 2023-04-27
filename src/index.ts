import { Command } from 'commander';
import * as process from "process";
import * as console from "console";
import * as fs from "fs";
import * as path from "path";
import { autoIncrementedColumns , dynamicColumnsString } from "./DynamicColumns";

const program = new Command ();

function pascalCaseToSnakeCase ( s : string ) : string {
	return s.replace ( /(?:^|\.?)([A-Z])/g , function ( x , y ) {
		return "_" + y.toLowerCase ()
	} ).replace ( /^_/ , "" );
}

function getStringNoMigrationWord ( name : string ) {
	return name.includes ( "Migration" ) ? name.substring ( 0 , name.indexOf ( "Migration" ) ) : name;
}

program.version ( '1.0.10' ).arguments ( "<name> <dbType> [starterCode] [tableName]" ).description ( 'Create a new TypeORM migration' ).action (
	async () => {
		try {
			let name : string , dbType : string , starterCode : boolean , tableName : string;
			const args = process.argv.splice ( 2 );
			for ( let item of args ) {
				if ( item.includes ( "migration=" ) ) {
					name = item.substring ( "migration=".length );
				} else if ( item.includes ( "db=" ) ) {
					dbType = item.substring ( "db=".length );
				} else if ( item.includes ( "st=" ) && item !== "st=" ) {
					starterCode = item.substring ( "st=".length ) === "1";
				} else if ( item.includes ( "t=" ) && item !== "t=" ) {
					tableName = item.substring ( "t=".length );
				}
			}
			const dbTypes = Object.keys ( autoIncrementedColumns );
			
			if ( ! dbTypes.includes ( dbType ) ) {
				throw new Error ( "Un supported database type" );
			}
			if ( dbType === "oracle" ) {
				console.warn ( "----------------Warning-----------------" );
				console.warn ( "Please create a sequence for your table." );
				console.warn ( "----------------------------------------" );
			}
			
			const timestamp = new Date ().getTime ();
			const directoryName = path.dirname ( name );
			const fileName = path.basename ( name );
			const migrationName = `${ timestamp }-${ fileName }.ts`;
			
			const template = `import { MigrationInterface , QueryRunner , Table } from "typeorm";
${ starterCode ? 'import { dynamicColumns } from "./DynamicColumns";' : '' }

export class ${ fileName }${ timestamp } implements MigrationInterface {
	tableName = '${ tableName && tableName !== "" ? tableName : pascalCaseToSnakeCase ( getStringNoMigrationWord ( fileName ) ).toLowerCase () }';
	
	public async up ( queryRunner : QueryRunner ) : Promise<void> {
		${ starterCode ? `const table = new Table (
			{
				name : this.tableName ,
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
		);` : "" }
	}
	
	public async down ( queryRunner : QueryRunner ) : Promise<void> {
		${ starterCode ? "await queryRunner.dropTable ( this.tableName );" : "" }
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
						if ( starterCode ) {
							if ( ! fs.existsSync ( path.resolve ( directoryName , "DynamicColumns.ts" ) ) ) {
								fs.writeFileSync ( path.resolve ( directoryName , "DynamicColumns.ts" ) , dynamicColumnsString ( dbType ) );
							}
						}
						
						fs.writeFileSync ( path.resolve ( directoryName , `${ migrationName }` ) , template);
						console.log ( `Migration ${ migrationName } has been created.` );
					}
				}
			);
		} catch ( err ) {
			console.error ( err );
		}
	}
);

program.parse ( process.argv );
