export const autoIncrementedColumns : any = {
	mysql : {
		auto : {
			type : "INTEGER" ,
			default : "AUTO_INCREMENT" ,
		} ,
		timeStamp : "TIMESTAMP",
	} ,
	pg : {
		auto : {
			type : "SERIAL" ,
			default : "" ,
		} ,
		timeStamp : "TIMESTAMPTZ",
	} ,
	oracle : {
		auto : {
			type : "INTEGER" ,
			default : "" ,
		} ,
		timeStamp : "TIMESTAMP",
	} ,
	mariadb : {
		auto : {
			type : "INTEGER" ,
			default : "AUTO_INCREMENT" ,
		} ,
		timeStamp : "DATETIME",
	} ,
	mssql : {
		auto : {
			type : "INT IDENTITY(1,1)" ,
			default : "" ,
		} ,
		timeStamp : "DATETIME2",
	} ,
};

export const dynamicColumnsString = ( dbType = "mysql" ) => {
	return `import { TableColumnOptions } from "typeorm/schema-builder/options/TableColumnOptions";

export const dynamicColumns = ( columns : TableColumnOptions[] , primaryKeyConstraintName?: string ) => [
	{
		name : "id" ,
		type : "${ autoIncrementedColumns [ dbType ].auto.type }${ autoIncrementedColumns[ dbType ].auto.default !==
	"" ? " " + autoIncrementedColumns [ dbType ].auto.default : "" }" ,
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
};
