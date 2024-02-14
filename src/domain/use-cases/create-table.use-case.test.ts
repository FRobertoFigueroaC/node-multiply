import { CreateTable } from './create-table.use-case';


describe('Test for create table use case', () => {
  test('should create table with default values', () => {
    const expected = `1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n1 x 5 = 5\n1 x 6 = 6\n1 x 7 = 7\n1 x 8 = 8\n1 x 9 = 9\n1 x 10 = 10`

    const createTable = new CreateTable();
    const table = createTable.execute({base: 1});
    const lines = table.split('\n');
    
    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toBe(expected);
    expect(lines.length).toBe(10);
  });

  test('should create table for limit = 15', () => {
    const expected = `1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n1 x 5 = 5\n1 x 6 = 6\n1 x 7 = 7\n1 x 8 = 8\n1 x 9 = 9\n1 x 10 = 10\n1 x 11 = 11\n1 x 12 = 12\n1 x 13 = 13\n1 x 14 = 14\n1 x 15 = 15`
    const limit = 15;
    const createTable = new CreateTable();
    const table = createTable.execute({base: 1, limit});
    const lines = table.split('\n');
    
    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toBe(expected);
    expect(table).toContain('1 x 1 = 1');
    expect(table).toContain('1 x 7 = 7');
    expect(table).toContain('1 x 15 = 15');
    expect(lines.length).toBe(limit);
  });
});