document.body.style.backgroundColor = "#000";
document.body.style.color = "#00FF00";
document.body.style.fontFamily = "'Courier New', Courier, monospace";

const header = document.createElement("div");
header.style.textAlign = "center";
header.innerHTML = `
  <h1>M0MLUX-CALC</h1>
  <p>
    <a href="https://m0mlux.github.io" target="_blank" style="color: #00FF00; text-decoration: none; font-style: italic;">
      https://m0mlux.github.io
    </a>
  </p>
`;

document.body.appendChild(header);

const calculator = document.createElement("div");
calculator.style.width = "480px";
calculator.style.margin = "50px auto";
calculator.style.padding = "20px";
calculator.style.borderRadius = "20px";
calculator.style.backgroundColor = "#1a1a1a";
calculator.style.boxShadow = "0 0 10px 5px rgba(0, 255, 0, 0.5)";
calculator.style.position = "relative";
document.body.appendChild(calculator);

const display = document.createElement("input");
display.setAttribute("type", "text");
display.setAttribute("readonly", "true");
display.value = "0";
display.style.width = "100%";
display.style.height = "60px";
display.style.backgroundColor = "#111";
display.style.color = "#00FF00";
display.style.fontSize = "2rem";
display.style.textAlign = "right";
display.style.padding = "10px";
display.style.border = "2px solid #00FF00";
display.style.borderRadius = "10px";
display.style.marginBottom = "20px";
calculator.appendChild(display);

const historyContainer = document.createElement("div");
historyContainer.style.position = "absolute";
historyContainer.style.top = "50px";
historyContainer.style.right = "20px";
historyContainer.style.width = "250px";
historyContainer.style.height = "calc(100% - 50px)";
historyContainer.style.backgroundColor = "#222";
historyContainer.style.color = "#00FF00";
historyContainer.style.padding = "10px";
historyContainer.style.overflowY = "auto";
historyContainer.style.borderRadius = "10px";
historyContainer.style.fontSize = "1rem";
historyContainer.style.display = "none";
document.body.appendChild(historyContainer);

const historyTitle = document.createElement("h2");
historyTitle.innerText = "Historique";
historyContainer.appendChild(historyTitle);

const historyList = document.createElement("ul");
historyList.style.listStyleType = "none";
historyContainer.appendChild(historyList);

const keysContainer = document.createElement("div");
keysContainer.style.display = "grid";
keysContainer.style.gridTemplateColumns = "repeat(5, 1fr)";
keysContainer.style.gap = "10px";
calculator.appendChild(keysContainer);

const buttons = [
  "7",
  "8",
  "9",
  "/",
  "sin",
  "4",
  "5",
  "6",
  "*",
  "cos",
  "1",
  "2",
  "3",
  "-",
  "tan",
  "0",
  ".",
  "=",
  "+",
  "x²",
  "CE",
  "C",
  "<x|",
  "+/-",
  "√",
  "%",
  "π",
  "log",
  "exp",
  "ln",
];

buttons.forEach((buttonText) => {
  const button = document.createElement("button");
  button.textContent = buttonText;
  button.style.backgroundColor = "#111";
  button.style.color = "#00FF00";
  button.style.fontSize = "2rem";
  button.style.padding = "20px";
  button.style.border = "none";
  button.style.borderRadius = "10px";
  button.style.cursor = "pointer";
  button.style.transition = "background-color 0.3s";

  if (["sin", "cos", "tan", "log", "exp", "ln"].includes(buttonText)) {
    button.style.backgroundColor = "#333";
  }

  button.addEventListener("click", () => {
    if (buttonText === "C") {
      clearDisplay();
    } else if (buttonText === "CE") {
      backspace();
    } else if (buttonText === "=") {
      calculate();
    } else if (buttonText === "<x|") {
      handleParentheses();
    } else if (buttonText === "+/-") {
      toggleSign();
    } else if (buttonText === "%") {
      appendToDisplay("*0.01");
    } else {
      appendToDisplay(buttonText);
    }
  });

  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "#00CC00";
  });

  button.addEventListener("mouseout", () => {
    if (["sin", "cos", "tan", "log", "exp", "ln"].includes(buttonText)) {
      button.style.backgroundColor = "#333";
    } else {
      button.style.backgroundColor = "#111";
    }
  });

  keysContainer.appendChild(button);
});

const clearHistoryButton = document.createElement("button");
clearHistoryButton.textContent = "Clear History";
clearHistoryButton.style.backgroundColor = "#ff0000";
clearHistoryButton.style.color = "#00FF00";
clearHistoryButton.style.fontSize = "1rem";
clearHistoryButton.style.padding = "10px";
clearHistoryButton.style.border = "none";
clearHistoryButton.style.borderRadius = "10px";
clearHistoryButton.style.cursor = "pointer";
clearHistoryButton.style.transition = "background-color 0.3s";
clearHistoryButton.addEventListener("click", clearHistory);
calculator.appendChild(clearHistoryButton);

const historyButton = document.createElement("button");
historyButton.textContent = "History";
historyButton.style.backgroundColor = "#00CC00";
historyButton.style.color = "#00FF00";
historyButton.style.fontSize = "1rem";
historyButton.style.padding = "10px";
historyButton.style.border = "none";
historyButton.style.borderRadius = "10px";
historyButton.style.cursor = "pointer";
historyButton.style.transition = "background-color 0.3s";
historyButton.addEventListener("click", toggleHistory);
calculator.appendChild(historyButton);

let history = [];

function appendToDisplay(value) {
  if (display.value === "0" && value !== ".") {
    display.value = value;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = "0";
}

function backspace() {
  display.value = display.value.slice(0, -1);
  if (display.value === "") {
    display.value = "0";
  }
}

function toggleSign() {
  if (display.value !== "0") {
    display.value =
      display.value.charAt(0) === "-"
        ? display.value.slice(1)
        : "-" + display.value;
  }
}

function handleParentheses() {
  const displayValue = display.value;
  const lastChar = displayValue.charAt(displayValue.length - 1);

  if (lastChar === "|" || lastChar === "x") {
    display.value = display.value.slice(0, -1) + "|x";
  } else {
    display.value += "<x|";
  }
}

function calculate() {
  try {
    let result = display.value;

    result = result.replace(/x²/g, "**2");
    result = result.replace(/√/g, "Math.sqrt");
    result = result.replace(/π/g, Math.PI);
    result = result.replace(/sin/g, "Math.sin");
    result = result.replace(/cos/g, "Math.cos");
    result = result.replace(/tan/g, "Math.tan");
    result = result.replace(/log/g, "Math.log10");
    result = result.replace(/exp/g, "Math.exp");
    result = result.replace(/ln/g, "Math.log");

    result = eval(result);
    display.value = result;

    // Save the calculation to history
    history.push({ expression: display.value, result: result });
    saveHistory();
  } catch (e) {
    display.value = "Erreur";
  }
}

function toggleHistory() {
  historyContainer.style.display =
    historyContainer.style.display === "none" ? "block" : "none";
  updateHistory();
}

function updateHistory() {
  historyList.innerHTML = "";
  history.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = `${item.expression} = ${item.result}`;
    historyList.appendChild(li);
  });
}

function saveHistory() {
  localStorage.setItem("calcHistory", JSON.stringify(history));
  updateHistory();
}

function clearHistory() {
  history = [];
  localStorage.removeItem("calcHistory");
  updateHistory();
}

// Load history from local storage if available
const storedHistory = JSON.parse(localStorage.getItem("calcHistory"));
if (storedHistory) {
  history = storedHistory;
  updateHistory();
}
