const fs = require("fs");

const fileContents = fs.readFileSync("./input.txt").toString();
const lines: string[] = fileContents.split("\n");
lines[lines.length - 1] = lines[lines.length - 1].trim();
const nonEmptyLines: string[] = lines.filter((line) => line.trim() !== "");

const testLines: string[] = ["two1nine", "eightwothree", "abcone2threexyz", "xtwone3four", "4nineeightseven2", "zoneight234", "7pqrstsixteen"];

let hashmap = new Map<String, Number>();
hashmap.set("one", 1);
hashmap.set("two", 2);
hashmap.set("three", 3);
hashmap.set("four", 4);
hashmap.set("five", 5);
hashmap.set("six", 6);
hashmap.set("seven", 7);
hashmap.set("eight", 8);
hashmap.set("nine", 9);


hashmap.forEach((value, key) => {
  console.log("key: " + key + " value: " + value);
});

let result = 0;

for (const line of nonEmptyLines) {
  let first: number = -1;
  let last: number = -1;

  let word = "";

  for (let i = 0; i < line.length; i++) {
    if (!isNaN(Number(line[i]))) {
      first = Number(line[i]);
    }

    word += line[i];
    hashmap.forEach((value, key) => {
      if (word.includes(key.toString())) {
        first = value.valueOf();
      }
    });

    if (first != -1) break;
  }
  word = "";
  for (let i = line.length - 1; i >= 0; i--) {
    if (!isNaN(Number(line[i]))) {
      last = Number(line[i]);
      break;
    }
    word = line[i] + word;
    hashmap.forEach((value, key) => {
      if (word.includes(key.toString())) {
        last = value.valueOf();
      }
    });

    if (last != -1) break;
  }
  if (first == -1 || last == -1)
    console.log("fail line first:" + first + " last:" + last);

  let number = first * 10 + last;

  result += number;
}
console.log(result);
