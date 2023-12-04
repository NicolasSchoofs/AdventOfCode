const fs = require("fs");

const fileContents = fs.readFileSync("./input.txt").toString();
const lines: string[] = fileContents.split("\n");
lines[lines.length - 1] = lines[lines.length - 1].trim();
const nonEmptyLines: string[] = lines.filter((line) => line.trim() !== "");

const twoDArray: string[][] = nonEmptyLines.map((line) => line.split(""));

let result = 0;
let bool = false;

let x: number[] = [];
let y: number[] = [];

let gearNumbers: number[] = [];
let gearCoordinates: number[][] = [];




for (let i = 0; i < twoDArray.length; i++) {
  for (let j = 0; j < twoDArray[i].length; j++) {
    if (!isNaN(Number(twoDArray[i][j]))) {
      x.push(i);
      y.push(j);
    } else {
      if (x.length > 0 && y.length > 0) {
        let a = 0;
        while (a <= x.length - 1) {
          //check boven
          if (x[a] > 0) {
            if (
              twoDArray[x[a] - 1][y[a]] == "*"
            ) {
              bool = true;
              let coords = [x[a] - 1, y[a]];
              gearCoordinates.push(coords);

              break;
            }
          }
          //check onder
          if (x[a] < twoDArray.length - 1) {
            if (
              twoDArray[x[a] + 1][y[a]] == "*"
            ) {
              bool = true;
              let coords = [x[a] + 1, y[a]];
              gearCoordinates.push(coords);
              break;
            }
          }
          //check links
          if (y[a] > 0) {
            if (
              twoDArray[x[a]][y[a] - 1] == "*"
            ) {
              bool = true;
              let coords = [x[a], y[a] - 1];
              gearCoordinates.push(coords);
              break;
            }
          }
          //check rechts
          if (y[a] < twoDArray[x[a]].length - 1) {
            if (
              twoDArray[x[a]][y[a] + 1] == "*"
            ) {
              bool = true;
              let coords = [x[a], y[a] + 1];
              gearCoordinates.push(coords);
              break;
            }
          }

          // Check links boven
          if (x[a] > 0 && y[a] > 0) {
            if (
              twoDArray[x[a] - 1][y[a] - 1] == "*" 
            ) {
              bool = true;
              let coords = [x[a] - 1, y[a] - 1];
              gearCoordinates.push(coords);
              break;
            }
          }

          // Check rechts boven
          if (x[a] > 0 && y[a] < twoDArray[x[a] - 1].length - 1) {
            if (
              twoDArray[x[a] - 1][y[a] + 1] == "*"
            ) {
              bool = true;
              let coords = [x[a] - 1, y[a] + 1];
              gearCoordinates.push(coords);
              break;
            }
          }

          // Check onder links
          if (x[a] < twoDArray.length - 1 && y[a] > 0) {
            if (
              twoDArray[x[a] + 1][y[a] - 1] == "*"
            ) {
              bool = true;
              let coords = [x[a] + 1, y[a] - 1];
              gearCoordinates.push(coords);
              break;
            }
          }

          // Check onder rechts
          if (
            x[a] < twoDArray.length - 1 &&
            y[a] < twoDArray[x[a] + 1].length - 1
          ) {
            if (
              twoDArray[x[a] + 1][y[a] + 1] == "*" 
            ) {
              bool = true;
              let coords = [x[a] + 1, y[a] + 1];
              gearCoordinates.push(coords);
              break;
            }
          }
          a++;
        }
        if (bool) {
          let a = 0;
          let number = "";
          while (a <= x.length - 1) {
            number += twoDArray[x[a]][y[a]];
            a++;
          }
          gearNumbers.push(Number(number));
        }
        x = [];
        y = [];
        bool = false;
      }
    }
  }
}

//dit is zo scuffed omegaLUL
let indexes: number[] = [];
for(let i = 0; i < gearCoordinates.length; i++){
  for(let j = 0; j < gearCoordinates.length; j++) {
    if(i != j) {
      if(compareArrays(gearCoordinates[i], gearCoordinates[j])) {
        indexes.push(j);
      }
    }
  }
  if(indexes.length == 1) {
    result += gearNumbers[i] * gearNumbers[indexes[0]]
  }
  indexes = [];
}

function compareArrays(arr1: number[], arr2: number[]) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

console.log(result / 2);
