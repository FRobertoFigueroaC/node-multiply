import { ServerApp } from "./presentation/server-app";


describe('Tests in app.ts', () => {
  test('should call Server.tun with values', async() => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = ['node','app.ts','-b', '7', '-l', '9', '-s', '-n', 'testFile', '-d', './testDirectory'];
    await import('./app');

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 7,
      limit: 9,
      showTable: true,
      name: 'testFile',
      destination: './testDirectory'
    })
    expect(serverRunMock).toHaveBeenCalledTimes(1);
  });
});