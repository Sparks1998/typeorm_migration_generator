export const autoIncrementedColumns : any = {
	mysql : {
		auto: "AUTO_INCREMENT",
		timeStamp : "TIMESTAMP"
	} ,
	pg :  {
		auto: "SERIAL" ,
		timeStamp : "TIMESTAMPTZ"
	} ,
	oracle :  {
		auto: "INTEGER",
		timeStamp : "TIMESTAMP"
	} ,
	mariadb :  {
		auto: "AUTO_INCREMENT",
		timeStamp : "DATETIME"
	} ,
	mssql :  {
		auto: "INT IDENTITY(1,1)",
		timeStamp : "DATETIME2"
	} ,
};

export const dynamicColumnsString = ( dbType = "mysql" ) => {
	return `import { TableColumnOptions } from "typeorm/schema-builder/options/TableColumnOptions";

export const dynamicColumns = ( columns : TableColumnOptions[] , primaryKeyConstraintName?: string ) => [
	{
		name : "id" ,
		type : "${ autoIncrementedColumns [ dbType ].auto }" ,
		isPrimary : true ,
		primaryKeyConstraintName : primaryKeyConstraintName ,
	} ,
	... columns ,
	{
		name : "created_at" ,
		type : "${ autoIncrementedColumns [ dbType ].timeStamp }" ,
		default : "CURRENT_TIMESTAMP"
	} ,
	{
		name : "updated_at" ,
		type : "${ autoIncrementedColumns [ dbType ].timeStamp }" ,
		default : "CURRENT_TIMESTAMP"
	}
];`;
}
