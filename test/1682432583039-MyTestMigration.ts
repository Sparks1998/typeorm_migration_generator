import { MigrationInterface , QueryRunner , Table } from "typeorm";


export class MyTestMigration1682432583039 implements MigrationInterface {
	name = 'my_test';
	
	public async up ( queryRunner : QueryRunner ) : Promise<void> {
		
	}
	
	public async down ( queryRunner : QueryRunner ) : Promise<void> {
		
	}
}