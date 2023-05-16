const battleship = require("./index.js");
const sum = battleship.sum;
const subtract = battleship.subtract;

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("subtract 1 - 2 to equal -1", () => {
  expect(subtract(1, 2)).toBe(-1);
});
