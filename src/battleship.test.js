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

test("Gameboard factory returns object", () => {
  expect(battleship.Gameboard()).toEqual(expect.any(Object));
});

test("Gameboard factory returns object with placeShip method", () => {
  expect(battleship.Gameboard()).toHaveProperty("placeShip");
});

test("Gameboard factory returns object with receiveAttack method", () => {
  expect(battleship.Gameboard()).toHaveProperty("receiveAttack");
});

test("Gameboard factory returns object with allSunk method", () => {
  expect(battleship.Gameboard()).toHaveProperty("allSunk");
});

test("placeShip method places ship on board horizontally", () => {
  const board = battleship.Gameboard();
  const ship = battleship.Ship(3);
  board.placeShip(ship, 0, 0, "horizontal");
  expect(board.board[0][0].shipSpace).toEqual(true);
  expect(board.board[1][0].shipSpace).toEqual(true);
  expect(board.board[2][0].shipSpace).toEqual(true);
  expect(board.board[0][0].shipPointer).toEqual(ship);
  expect(board.board[1][0].shipPointer).toEqual(ship);
  expect(board.board[2][0].shipPointer).toEqual(ship);
});

test("placeShip method places ship on board vertically", () => {
  const board = battleship.Gameboard();
  const ship = battleship.Ship(3);
  board.placeShip(ship, 0, 0, "vertical");
  expect(board.board[0][0].shipSpace).toEqual(true);
  expect(board.board[0][1].shipSpace).toEqual(true);
  expect(board.board[0][2].shipSpace).toEqual(true);
  expect(board.board[0][0].shipPointer).toEqual(ship);
  expect(board.board[0][1].shipPointer).toEqual(ship);
  expect(board.board[0][2].shipPointer).toEqual(ship);
});

test("receiveAttack method records missed attack", () => {
  const board = battleship.Gameboard();
  board.receiveAttack(0, 0);
  expect(board.board[0][0].shotAt).toBe(true);
});

test("receiveAttack method records hit attack", () => {
  const board = battleship.Gameboard();
  const ship = battleship.Ship(3);
  board.placeShip(ship, 0, 0, "horizontal");
  board.receiveAttack(0, 0);
  expect(board.board[0][0].shotAt).toBe(true);
  expect(board.board[0][0].shipSpace).toBe(true);
  expect(ship.isSunk()).toBe(false);
});

test("receiveAttack method records sunk attack", () => {
  const board = battleship.Gameboard();
  const ship = battleship.Ship(3);
  board.placeShip(ship, 0, 0, "horizontal");
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);
  board.receiveAttack(2, 0);
  expect(ship.isSunk()).toBe(true);
});

test("allSunk method returns false when not all ships are sunk", () => {
  const board = battleship.Gameboard();
  const ship = battleship.Ship(3);
  const ship2 = battleship.Ship(3);
  board.placeShip(ship, 0, 0, "horizontal");
  board.placeShip(ship2, 0, 1, "horizontal");
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);
  board.receiveAttack(2, 0);
  expect(ship.isSunk()).toBe(true);
  expect(ship2.isSunk()).toBe(false);
  expect(board.allSunk()).toBe(false);
});

test("allSunk method returns true when all ships are sunk", () => {
  const board = battleship.Gameboard();
  const ship = battleship.Ship(3);
  board.placeShip(ship, 0, 0, "horizontal");
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 0);
  board.receiveAttack(2, 0);
  expect(board.allSunk()).toBe(true);
});
