
export interface CreateTableUseCase {
  execute: (options:CreateTableOptions) => string;
}

interface CreateTableOptions {
  base: number;
  limit?: number
}

export class CreateTable implements CreateTableUseCase {
  constructor(
    /* 
      DI _ Dependency Injection
     */
  ) {}

  execute({base, limit = 10}: CreateTableOptions): string {
    let result = '';
    for (let index = 1; index <= limit; index++) {
      const item = `${base} x ${index} = ${base * index} \n` 
      result += item;
    }
    return result;
  }
}