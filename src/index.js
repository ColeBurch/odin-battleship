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

module.exports = {};
module.exports.Ship = Ship;
