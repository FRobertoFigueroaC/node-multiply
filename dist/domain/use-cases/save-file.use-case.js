"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveFile = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
class SaveFile {
    constructor(
    /*
      DI _ Dependency Injection
      repository
     */
    ) { }
    execute({ fileContent, fileDestination = 'outputs', fileName = 'table.txt', }) {
        console.log(fileName, fileDestination);
        try {
            node_fs_1.default.mkdirSync(fileDestination, { recursive: true });
            node_fs_1.default.writeFileSync(`${fileDestination}/${fileName}`, fileContent);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
}
exports.SaveFile = SaveFile;
