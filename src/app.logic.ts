
import fs from "node:fs";

const base = 6
const header = `
===================== 
 Tabla del ${base}
=====================\n`

let result = `${header}`;

for (let index = 1; index <= 10; index++) {
  const item = `${base} x ${index} = ${base * index} \n` 
  result += item;
}

const outputPath = 'outputs'

fs.mkdirSync(outputPath, {recursive:true})
fs.writeFile(`${outputPath}/tabla${base}.txt`, result, (error) => {
  console.error(error);
});
console.log(result);  




