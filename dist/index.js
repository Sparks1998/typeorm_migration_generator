"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const DynamicColumns_1 = require("./DynamicColumns");
const program = new commander_1.Command();
function pascalCaseToSnakeCase(s) {
    return s.replace(/(?:^|\.?)([A-Z])/g, function (x, y) {
        return "_" + y.toLowerCase();
    }).replace(/^_/, "");
}
function getStringNoMigrationWord(name) {
    return name.includes("Migration") ? name.substring(0, name.indexOf("Migration")) : name;
}
program.version('0.1.0').arguments('<name>, <dbType>').description('Create a new TypeORM migration').action((name, dbType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbTypes = Object.keys(DynamicColumns_1.autoIncrementedColumns);
        if (!dbTypes.includes(dbType)) {
            throw new Error("Un supported database type");
        }
        if (dbType === "oracle") {
            console.warn("----------------Warning-----------------");
            console.warn("Please create a sequence for your table.");
            console.warn("----------------------------------------");
        }
        const timestamp = new Date().getTime();
        const directoryName = path.dirname(name);
        const fileName = path.basename(name);
        const migrationName = `${timestamp}-${fileName}.ts`;
        const template = `import { MigrationInterface , QueryRunner , Table } from "typeorm";
import { dynamicColumns } from "./DynamicColumns";

export class ${fileName}${timestamp} implements MigrationInterface {
	name = '${pascalCaseToSnakeCase(getStringNoMigrationWord(fileName)).toLowerCase()}';
	
	public async up ( queryRunner : QueryRunner ) : Promise<void> {
		const table = new Table (
			{
				name : this.name ,
				// Extra columns to use add to the table.
				columns : dynamicColumns (
					[] ,
					"${pascalCaseToSnakeCase(getStringNoMigrationWord(fileName)).toUpperCase()}_PRIMARY_KEY"
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
        fs.mkdir(directoryName, {
            recursive: true,
        }, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                if (!fs.existsSync(path.resolve(directoryName, "DynamicColumns.ts"))) {
                    fs.writeFileSync(path.resolve(directoryName, "DynamicColumns.ts"), (0, DynamicColumns_1.dynamicColumnsString)(dbType));
                }
                fs.writeFileSync(path.resolve(directoryName, `${migrationName}`), template);
                console.log(`Migration ${migrationName} has been created.`);
            }
        });
    }
    catch (err) {
        console.error(err);
    }
}));
program.parse(process.argv);
//# sourceMappingURL=index.js.map