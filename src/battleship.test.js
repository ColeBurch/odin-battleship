const battleship = require("./index.js");

test("Ship factory returns object", () => {
  expect(battleship.Ship(3)).toEqual(expect.any(Object));
});

test("Ship factory returns object with length property", () => {
  expect(battleship.Ship(3)).toHaveProperty("length", 3);
});

test("Ship factory returns object with hit method", () => {
  expect(battleship.Ship(3)).toHaveProperty("hit");
});

test("Ship factory returns object with isSunk method", () => {
  expect(battleship.Ship(3)).toHaveProperty("isSunk");
});

test("isSunk method returns false when ship is not sunk", () => {
  const ship = battleship.Ship(3);
  expect(ship.isSunk()).toBe(false);
});

test("isSunk method returns true when ship is sunk", () => {
  const ship = battleship.Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
