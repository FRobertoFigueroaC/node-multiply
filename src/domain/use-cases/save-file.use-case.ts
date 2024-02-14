import fs from "node:fs";

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean
}

interface SaveFileOptions {
  fileDestination ?: string;
  fileContent: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor(
    /* 
      DI _ Dependency Injection
      repository
     */
  ) {}

  execute({
    fileContent,
    fileDestination = 'outputs',
    fileName = 'table.txt',
  }: SaveFileOptions): boolean {
    try {
      fs.mkdirSync(fileDestination, {recursive:true})
      fs.writeFileSync(`${fileDestination}/${fileName}`, fileContent)
      return true;
    } catch (error) {
      // TODO : Add winston logger here 
      // console.error(error)
      return false;
    }
  }
}

