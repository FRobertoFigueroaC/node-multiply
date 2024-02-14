
const originalArgv = process.argv;

const runCommand = async (args:string) => {
  process.argv = [...process.argv, ...args.split(' ')];

  const { yarg } = await import('./yargs.plugin')

  return yarg;
} 

describe('Test for yargs plugin', () => {

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test('should return default values', async() => {

    const yarg = await runCommand('-b 7');
    expect(yarg).toMatchObject({
        b: 7,
        l: 10,
        s: false,
        n: 'table',
        d: './outputs',
    });
  });

  test('should return configuration with custom values', async () => {
    const yarg = await runCommand('-b 7 -l 9 -s -n testFile -d ./testDirectory');
    expect(yarg).toMatchObject({
        b: 7,
        l: 9,
        s: true,
        n: 'testFile',
        d: './testDirectory',
    });
  });
});