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

test("placeShip method returns false when ship is placed outside of board boundaries", () => {
  const board = battleship.Gameboard();
  const ship = battleship.Ship(3);
  expect(board.placeShip(ship, 10, 10, "horizontal")).toBe(false);
});

test("placeShip method returns false when ship is placed on top of another ship", () => {
  const board = battleship.Gameboard();
  const ship = battleship.Ship(3);
  const ship2 = battleship.Ship(3);
  board.placeShip(ship, 0, 0, "horizontal");
  expect(board.placeShip(ship2, 0, 0, "horizontal")).toBe(false);
});

test("placeShip method returns false when extended ship is placed outside of board boundaries horizontally", () => {
  const board = battleship.Gameboard();
  const ship = battleship.Ship(3);
  expect(board.placeShip(ship, 8, 8, "horizontal")).toBe(false);
});

test("placeShip method returns false when extended ship is placed on top of another ship horizontally", () => {
  const board = battleship.Gameboard();
  const ship = battleship.Ship(3);
  const ship2 = battleship.Ship(3);
  board.placeShip(ship, 2, 0, "horizontal");
  expect(board.placeShip(ship2, 0, 0, "horizontal")).toBe(false);
});

test("placeShip method returns false when extended ship is placed outside of board boundaries vertically", () => {
  const board = battleship.Gameboard();
  const ship = battleship.Ship(3);
  expect(board.placeShip(ship, 8, 8, "vertical")).toBe(false);
});

test("placeShip method returns false when extended ship is placed on top of another ship vertically", () => {
  const board = battleship.Gameboard();
  const ship = battleship.Ship(3);
  const ship2 = battleship.Ship(3);
  board.placeShip(ship, 0, 2, "vertical");
  expect(board.placeShip(ship2, 0, 0, "vertical")).toBe(false);
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

test("receiveAttack method returns false when attack is outside of board boundaries", () => {
  const board = battleship.Gameboard();
  expect(board.receiveAttack(10, 10)).toBe(false);
});

test("receiveAttack method returns false when attack is on a previously attacked space", () => {
  const board = battleship.Gameboard();
  board.receiveAttack(0, 0);
  expect(board.receiveAttack(0, 0)).toBe(false);
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

test("Player method returns an object", () => {
  expect(typeof battleship.Player()).toBe("object");
});

test("Player method returns an object with a name property", () => {
  expect(battleship.Player().name).toBeDefined();
});

test("Player method returns an object with a board property", () => {
  expect(battleship.Player().board).toBeDefined();
});

test("Player method returns an object with a ships property", () => {
  expect(battleship.Player().ships).toBeDefined();
});

test("Player method returns an object with a ships property that is an array", () => {
  expect(Array.isArray(battleship.Player().ships)).toBe(true);
});

test("computer method returns an object", () => {
  expect(typeof battleship.computer()).toBe("object");
});

test("computer method returns an object with a name property", () => {
  expect(battleship.computer().name).toBeDefined();
});

test("computer method returns an object with a board property", () => {
  expect(battleship.computer().board).toBeDefined();
});

test("computer method returns an object with a ships property", () => {
  expect(battleship.computer().ships).toBeDefined();
});

test("computer method returns an object with a ships property that is an array", () => {
  expect(Array.isArray(battleship.computer().ships)).toBe(true);
});
