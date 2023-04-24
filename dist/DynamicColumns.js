"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicColumnsString = void 0;
exports.dynamicColumnsString = `import { TableColumnOptions } from "typeorm/schema-builder/options/TableColumnOptions";

export const dynamicColumns = ( columns : TableColumnOptions[] , primaryKeyConstraintName?: string ) => [
	{
		name : "id" ,
		type : "SERIAL" ,
		isPrimary : true ,
		primaryKeyConstraintName : primaryKeyConstraintName ,
	} ,
	... columns ,
	{
		name : "created_at" ,
		type : "TIMESTAMPTZ" ,
		default : "CURRENT_TIMESTAMP"
	} ,
	{
		name : "updated_at" ,
		type : "TIMESTAMPTZ" ,
		default : "CURRENT_TIMESTAMP"
	}
];`;
//# sourceMappingURL=DynamicColumns.js.map