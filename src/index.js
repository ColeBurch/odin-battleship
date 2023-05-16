import "./style.css";

function component() {
  const element = document.createElement("div");
  element.classList.add("hello");

  element.innerHTML = "Hello World";

  sum(1, 2);

  return element;
}

function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

document.body.appendChild(component());

module.exports = {};
module.exports.sum = sum;
module.exports.subtract = subtract;
