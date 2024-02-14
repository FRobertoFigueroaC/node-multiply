import { SaveFile } from './save-file.use-case';
import fs from "node:fs";

describe('Test for save file use case', () => {

  /* beforeEach(() => {
    // clean up
  }); */

  afterEach(() => {
     // clean up
     const outputsFolderExists = fs.existsSync('outputs');
     if (outputsFolderExists) {
      fs.rmSync('outputs', {recursive: true});
     }
  });

  test('should create file with default values', () => {
    const saveFile = new SaveFile();
    const fileDestination = 'outputs/table.txt';
    const mockContent = 'testing';

    const result = saveFile.execute({fileContent: mockContent});

    const checkFile = fs.existsSync(fileDestination);

    const fileContent = fs.readFileSync(fileDestination, { encoding: 'utf-8'});

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(mockContent);
  });

  test('should create file with custom values', () => {
    const saveFile = new SaveFile();
    const options = {
      fileContent: 'testing content',
      fileDestination: 'custom-outputs',
      fileName: 'testing-table.txt'
    }
    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(options.fileDestination);

    const fileContent = fs.readFileSync(
      `${options.fileDestination}/${options.fileName}`,
      { encoding: 'utf-8'}
    );

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
    fs.rmSync(options.fileDestination, {recursive: true});
  });

  test('should return false if directory could not be created', () => {
    const saveFile = new SaveFile();

    const mkdirSpy = jest.spyOn(fs,'mkdirSync').mockImplementation(
      () => {throw new Error ('mocking mkdirSync')}
    );
    const mockContent = 'testing';

    const result = saveFile.execute({fileContent: mockContent});

    expect(result).toBeFalsy();
    mkdirSpy.mockRestore();
  });
  test('should return false if file could not be created', () => {
    const saveFile = new SaveFile();

    const writeFileSync = jest.spyOn(fs,'writeFileSync').mockImplementation(
      () => {throw new Error ('mocking writeFileSync')}
    );
    const mockContent = 'testing';

    const result = saveFile.execute({fileContent: mockContent});

    expect(result).toBeFalsy();

    writeFileSync.mockRestore();
  });
});