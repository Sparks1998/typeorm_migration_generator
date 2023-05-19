"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicColumnsString = exports.autoIncrementedColumns = void 0;
exports.autoIncrementedColumns = {
    mysql: {
        auto: {
            type: "INTEGER",
            default: "AUTO_INCREMENT",
        },
        timeStamp: "TIMESTAMP",
    },
    pg: {
        auto: {
            type: "SERIAL",
            default: "",
        },
        timeStamp: "TIMESTAMPTZ",
    },
    oracle: {
        auto: {
            type: "INTEGER",
            default: "",
        },
        timeStamp: "TIMESTAMP",
    },
    mariadb: {
        auto: {
            type: "INTEGER",
            default: "AUTO_INCREMENT",
        },
        timeStamp: "DATETIME",
    },
    mssql: {
        auto: {
            type: "INT IDENTITY(1,1)",
            default: "",
        },
        timeStamp: "DATETIME2",
    },
};
const dynamicColumnsString = (dbType = "mysql") => {
    return `import { TableColumnOptions } from "typeorm/schema-builder/options/TableColumnOptions";

export const dynamicColumns = ( columns : TableColumnOptions[] , primaryKeyConstraintName?: string ) => [
	{
		name : "id" ,
		type : "${exports.autoIncrementedColumns[dbType].auto.type}${exports.autoIncrementedColumns[dbType].auto.default !==
        "" ? "" + exports.autoIncrementedColumns[dbType].auto.default : ""}" ,
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