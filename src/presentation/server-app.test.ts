import fs from "node:fs";
import { ServerApp } from './server-app';
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { CreateTable } from "../domain/use-cases/create-table.use-case";


describe('Test for server app', () => {
  afterEach(() => {
    // clean up
    const testFolderOutputs = fs.existsSync('testFolderOutputs');
    if (testFolderOutputs) {
     fs.rmSync('testFolderOutputs', {recursive: true});
    }
 });
 const options = {
  base: 1,
  limit: 2,
  showTable: true,
  name: 'testFile',
  destination: 'testFolderOutputs',
}

  test('should create ServerApp instance', () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect( typeof ServerApp.run).toBe('function');
  });

  test('should run ServerApp with options', () => {
    
    const expectedContent = `${options.base} x 1 = 1\n${options.base} x 2 = 2`

    const logSpy = jest.spyOn(console, 'log');
    const logCreateTable = jest.spyOn(CreateTable.prototype, 'execute');
    const logSaveFile = jest.spyOn(SaveFile.prototype, 'execute');


    ServerApp.run(options)
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith('Server running...');
    expect(logSpy).toHaveBeenCalledWith(expectedContent);
    expect(logSpy).toHaveBeenLastCalledWith('File was created');
    expect(logCreateTable).toHaveBeenCalledTimes(1);
    expect(logSaveFile).toHaveBeenCalledTimes(1);
    expect(logCreateTable).toHaveBeenCalledWith({base:options.base, limit:options.limit});
    expect(logSaveFile).toHaveBeenCalledWith({
      fileContent: expectedContent,
      fileName: `${options.name}.txt`,
      fileDestination: options.destination
    });

    // expect(ServerApp.run).toHaveBeenCalledWith(options);
  });

  test('should run with custom values', () => {
    const mockContent = '1 x 2 = 1';
    const logMock = jest.fn();
    const createTableMock = jest.fn().mockReturnValue(mockContent);
    const saveFileMock = jest.fn().mockReturnValue(true);

    CreateTable.prototype.execute = createTableMock;
    SaveFile.prototype.execute = saveFileMock;
    global.console.log = logMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledTimes(3);
    expect(logMock).toHaveBeenCalledWith('Server running...');
    expect(logMock).toHaveBeenCalledWith(mockContent);
    expect(logMock).toHaveBeenLastCalledWith('File was created');
    expect(createTableMock).toHaveBeenCalledWith({base:options.base, limit:options.limit})
    expect(createTableMock).toHaveBeenCalledTimes(1);
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: mockContent,
      fileName: `${options.name}.txt`,
      fileDestination: options.destination
    })
    expect(saveFileMock).toHaveBeenCalledTimes(1);
  });
})