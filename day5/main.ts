const fs = require("fs");

const fileContents = fs.readFileSync("./input").toString();
const lines: string[] = fileContents.split("\n");
lines[lines.length - 1] = lines[lines.length - 1].trim();
const nonEmptyLines: string[] = lines.filter((line) => line.trim() !== "");

let seeds: number[] = nonEmptyLines[0].slice(nonEmptyLines[0].indexOf(':') + 2).split(' ').map(Number);

let mapsArray: number[][][] = readInputFile("./input");

let result = Number.MAX_VALUE;

for(let seed of seeds) {
  for(let mapType of mapsArray) {
    for(let line of mapType) {
      let destinationStart = line[0];
      let sourceStart = line[1];
      let length = line[2];
      let difference = destinationStart - sourceStart;

      if(seed >= sourceStart && seed <= sourceStart + length - 1){
        seed = seed + difference;
        break;
      } 
    }
    if(seed < result)
      result = seed;
  }

}
console.log(result);

function processLine(line: string): number[] {
    const numbers: number[] = line.split(' ').map(Number);

    const isValid = numbers.every((number) => !isNaN(number));

    if (!isValid || (numbers.length === 1 && numbers[0] === 0)) {
        console.log(`Invalid line: ${line}`);
        return [];
    }

    return numbers;
}

function readInputFile(filePath: string): number[][][] {
    const result: number[][][] = [];
    let currentArray: number[][] = [];

    const data: string = fs.readFileSync(filePath, 'utf-8');
    const lines: string[] = data.split('\n');

    for (const line of lines) {
        const trimmedLine: string = line.trim();

        if (trimmedLine.endsWith('map:')) {
            if (currentArray.length > 0) {
                result.push(currentArray);
                currentArray = [];
            }
        }

        const numbers = processLine(trimmedLine);
        if (numbers.length > 0) {
            currentArray.push(numbers);
        }
    }

    if (currentArray.length > 0) {
        result.push(currentArray);
    }

    return result;
}
