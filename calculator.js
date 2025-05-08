document.body.style.margin = "0";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.height = "100vh";
document.body.style.backgroundColor = "#f2f2f2";
document.body.style.fontFamily = "Segoe UI";

const calculator = document.createElement("div");
calculator.style.backgroundColor = "#262626";
calculator.style.borderRadius = "15px";
calculator.style.padding = "20px";
calculator.style.boxShadow = "0 0 20px rgba(0,0,0,0.2)";
calculator.style.display = "flex";
calculator.style.flexDirection = "column";
calculator.style.alignItems = "center";
calculator.style.width = "300px";

const display = document.createElement("input");
display.type = "text";
display.readOnly = true;
display.style.width = "100%";
display.style.marginBottom = "20px";
display.style.padding = "15px";
display.style.fontSize = "2rem";
display.style.border = "none";
display.style.borderRadius = "10px";
display.style.textAlign = "right";
display.style.backgroundColor = "#333";
display.style.color = "#fff";
calculator.appendChild(display);

const buttons = [
  "7",
  "8",
  "9",
  "+",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "*",
  "0",
  ".",
  "=",
  "/",
  "C",
];

const grid = document.createElement("div");
grid.style.display = "grid";
grid.style.gridTemplateColumns = "repeat(4, 1fr)";
grid.style.gap = "10px";
calculator.appendChild(grid);

buttons.forEach((text) => {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.style.padding = "20px";
  btn.style.fontSize = "1.5rem";
  btn.style.border = "none";
  btn.style.borderRadius = "50%";
  btn.style.cursor = "pointer";
  btn.style.backgroundColor = ["+", "-", "*", "/", "="].includes(text)
    ? "#f39c12"
    : "#444";
  btn.style.color = "#fff";
  btn.addEventListener("click", () => {
    if (text === "=") {
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Erreur";
      }
    } else if (text === "C") {
      display.value = "";
    } else {
      display.value += text;
    }
  });
  grid.appendChild(btn);
});

document.body.appendChild(calculator);
