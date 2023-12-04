const fs = require("fs");

const fileContents = fs.readFileSync("./input.txt").toString();
const lines: string[] = fileContents.split("\n");
lines[lines.length - 1] = lines[lines.length - 1].trim();
const nonEmptyLines: string[] = lines.filter((line) => line.trim() !== "");
const testLines: string[] = ["Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green", "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue", "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red", "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red", "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"];



let result = 0;
let maxRed = 12;
let maxGreen = 13;
let maxBlue = 14;
for(let line of nonEmptyLines) {
  let blue = 0;
  let red = 0;
  let green = 0;
  let minBlue = 0;
  let minRed = 0;
  let minGreen = 0;


  let indexOfColon: number = line.indexOf(":");

  let resultString: string = line.substring(indexOfColon + 1).trim();
  let sets = resultString.split(";")


  for(let set of sets) {
    let cubes = set.split(",")

    for(let cube of cubes) {
      cube = cube.trim()
      
      let a = cube.split(" ");
      switch(a[1]) {
        case "blue":
          blue += Number(a[0].trim())
          break;
        case "red":
          red += Number(a[0].trim())
          break;
        case "green":
          green += Number(a[0].trim())
          break;
        default:
          console.log("ERROR")

      }

    }

    if(blue > minBlue)
      minBlue = blue;
    if(red > minRed)
      minRed = red;
    if(green > minGreen)
      minGreen = green;

    blue = 0;
    red = 0;
    green = 0;

  }
  result+= minGreen * minRed * minBlue;

}
console.log(result);
