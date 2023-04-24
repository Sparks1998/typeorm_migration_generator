"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicColumnsString = exports.autoIncrementedColumns = void 0;
exports.autoIncrementedColumns = {
    mysql: {
        auto: "AUTO_INCREMENT",
        timeStamp: "TIMESTAMP"
    },
    pg: {
        auto: "SERIAL",
        timeStamp: "TIMESTAMPTZ"
    },
    oracle: {
        auto: "INTEGER",
        timeStamp: "TIMESTAMP"
    },
    mariadb: {
        auto: "AUTO_INCREMENT",
        timeStamp: "DATETIME"
    },
    mssql: {
        auto: "INT IDENTITY(1,1)",
        timeStamp: "DATETIME2"
    },
};
const dynamicColumnsString = (dbType = "mysql") => {
    return `import { TableColumnOptions } from "typeorm/schema-builder/options/TableColumnOptions";

export const dynamicColumns = ( columns : TableColumnOptions[] , primaryKeyConstraintName?: string ) => [
	{
		name : "id" ,
		type : "${exports.autoIncrementedColumns[dbType].auto}" ,
		isPrimary : true ,
		primaryKeyConstraintName : primaryKeyConstraintName ,
	} ,
	... columns ,
	{
		name : "created_at" ,
		type : "${exports.autoIncrementedColumns[dbType].timeStamp}" ,
		default : "CURRENT_TIMESTAMP"
	} ,
	{
		name : "updated_at" ,
		type : "${exports.autoIncrementedColumns[dbType].timeStamp}" ,
		default : "CURRENT_TIMESTAMP"
	}
];`;
};
exports.dynamicColumnsString = dynamicColumnsString;
//# sourceMappingURL=DynamicColumns.js.map