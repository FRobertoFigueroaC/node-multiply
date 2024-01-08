import yargs, { check } from 'yargs';
import { hideBin } from 'yargs/helpers';

export const yarg = yargs(hideBin(process.argv))
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
  check((argv, options) => {

    console.log(argv.b, typeof argv.b)

    if (argv.b < 1) throw new Error("base must be a number");
    
    return true
  })
  .parseSync()
