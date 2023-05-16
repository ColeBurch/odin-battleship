import "./style.css";

function component() {
  const element = document.createElement("div");
  element.classList.add("hello");

  element.innerHTML = "Hello World";

  return element;
}

document.body.appendChild(component());
