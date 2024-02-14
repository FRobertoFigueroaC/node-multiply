"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yarg = void 0;
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
exports.yarg = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Base multiplication'
})
    .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Multiplication Table limit'
})
    .option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show multiplication Table'
})
    .option('n', {
    alias: 'name',
    type: 'string',
    default: 'table',
    describe: 'File name'
})
    .option('d', {
    alias: 'destination',
    type: 'string',
    default: './outputs',
    describe: 'File destination'
})
    .check((argv, options) => {
    if (argv.b < 1)
        throw new Error("base must be a number greater than cero");
    if (argv.l < 1)
        throw new Error("base must be a number greater than cero");
    return true;
})
    .parseSync();
