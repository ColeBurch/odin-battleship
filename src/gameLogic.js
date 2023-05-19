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

const Player = () => {
  const name = "Player";
  const board = Gameboard();
  const ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
  const getRandomCoordinates = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  };
  const getRandomDirection = () => {
    const directions = ["horizontal", "vertical"];
    const direction = directions[Math.floor(Math.random() * 2)];
    return direction;
  };
  const randomPlaceShips = () => {
    for (let i = 0; i < ships.length; i++) {
      let coordinates = getRandomCoordinates();
      let x = coordinates[0];
      let y = coordinates[1];
      let direction = getRandomDirection();
      if (board.placeShip(ships[i], x, y, direction) === false) {
        i--;
      }
    }
  };
  return { name, board, ships, randomPlaceShips, getRandomCoordinates };
};

const Computer = () => {
  const name = "Computer";
  const board = Gameboard();
  const ships = [Ship(5), Ship(4), Ship(3), Ship(3), Ship(2)];
  const getRandomCoordinates = () => {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  };
  const getRandomDirection = () => {
    const directions = ["horizontal", "vertical"];
    const direction = directions[Math.floor(Math.random() * 2)];
    return direction;
  };
  const randomPlaceShips = () => {
    for (let i = 0; i < ships.length; i++) {
      let coordinates = getRandomCoordinates();
      let x = coordinates[0];
      let y = coordinates[1];
      let direction = getRandomDirection();
      if (board.placeShip(ships[i], x, y, direction) === false) {
        i--;
      }
    }
  };
  return { name, board, ships, randomPlaceShips, getRandomCoordinates };
};

const GameController = () => {
  const player = Player();
  player.randomPlaceShips();
  console.log(player.board.board);
  const computer = Computer();
  computer.randomPlaceShips();
  console.log(computer.board.board);
  let turncounter = 0;
  while (
    player.board.allSunk() === false &&
    computer.board.allSunk() === false
  ) {
    console.log("Turn " + turncounter);
    if (turncounter % 2 === 0) {
      let coordinates = computer.getRandomCoordinates();
      let x = coordinates[0];
      let y = coordinates[1];
      if (player.board.receiveAttack(x, y) === false) {
        turncounter--;
      }
    } else {
      let coordinates = player.getRandomCoordinates();
      let x = coordinates[0];
      let y = coordinates[1];
      if (computer.board.receiveAttack(x, y) === false) {
        turncounter--;
      }
    }
    turncounter++;
  }
  if (player.board.allSunk()) {
    console.log("Computer wins in " + turncounter + " turns!");
  } else {
    console.log("Player wins in " + turncounter + " turns");
  }
};

module.exports = { Ship, Gameboard, Player, Computer, GameController };
