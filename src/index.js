import "./style.css";

const Ship = (len) => {
  const length = len;
  let hits = 0;
  const hit = () => {
    hits++;
  };
  const isSunk = () => {
    return hits === length;
  };
  return { length, hit, isSunk };
};

const Gameboard = () => {
  const board = [];
  for (let i = 0; i < 10; i++) {
    board.push([]);
    for (let j = 0; j < 10; j++) {
      board[i].push({
        shipSpace: false,
        shipPointer: null,
        shotAt: false,
      });
    }
  }
  const placeShip = (ship, x, y, direction) => {
    if (direction === "horizontal") {
      if (x < 0 || x > 9 || y < 0 || y > 9) {
        return false;
      }
      if (x + ship.length > 10) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        if (board[x + i][y].shipSpace) {
          return false;
        }
      }
      for (let i = 0; i < ship.length; i++) {
        board[x + i][y].shipSpace = true;
        board[x + i][y].shipPointer = ship;
      }
    } else if (direction === "vertical") {
      if (x < 0 || x > 9 || y < 0 || y > 9) {
        return false;
      }
      if (y + ship.length > 10) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        if (board[x][y + i].shipSpace) {
          return false;
        }
      }
      for (let i = 0; i < ship.length; i++) {
        board[x][y + i].shipSpace = true;
        board[x][y + i].shipPointer = ship;
      }
    }
  };
  const receiveAttack = (x, y) => {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return false;
    }
    if (board[x][y].shotAt) {
      return false;
    }
    board[x][y].shotAt = true;
    if (board[x][y].shipSpace) {
      board[x][y].shipPointer.hit();
    }
  };
  const allSunk = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (
          board[i][j].shipSpace &&
          board[i][j].shipPointer.isSunk() === false
        ) {
          return false;
        } else {
          continue;
        }
      }
    }
    return true;
  };
  return { board, placeShip, receiveAttack, allSunk };
};

module.exports = {};
module.exports.Ship = Ship;
module.exports.Gameboard = Gameboard;
