"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTable = void 0;
class CreateTable {
    constructor(
    /*
      DI _ Dependency Injection
     */
    ) { }
    execute({ base, limit = 10 }) {
        let result = '';
        for (let index = 1; index <= limit; index++) {
            const item = `${base} x ${index} = ${base * index} \n`;
            result += item;
        }
        return result;
    }
}
exports.CreateTable = CreateTable;
