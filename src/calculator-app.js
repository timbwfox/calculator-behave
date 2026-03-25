import { createCalculatorEngine } from "./calculator-engine.js";

const calculator = createCalculatorEngine();

function render() {
  const state = calculator.getState();
  document.getElementById("result").textContent = state.display;
  document.getElementById("expression").textContent = state.expression;
}

function initializeCalculatorUi() {
  const calculatorRoot = document.getElementById("app");
  if (!calculatorRoot) {
    return;
  }

  render();

  calculatorRoot.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) {
      return;
    }

    const buttonValue = button.dataset.button;
    if (!buttonValue) {
      return;
    }

    if (/^\d$/.test(buttonValue)) {
      calculator.pressDigit(buttonValue);
      render();
      return;
    }

    if (["+", "-", "x", "/"].includes(buttonValue)) {
      calculator.pressOp(buttonValue);
      render();
      return;
    }

    if (buttonValue === ".") calculator.pressAction("dot");
    if (buttonValue === "=") calculator.pressAction("equals");
    if (buttonValue === "C") calculator.pressAction("clear");
    if (buttonValue === "+/-") calculator.pressAction("toggle-sign");
    if (buttonValue === "%") calculator.pressAction("percent");
    render();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeCalculatorUi);
} else {
  initializeCalculatorUi();
}

// Keep globals available so inline handlers still work if present.
window.calcDigit = (digit) => {
  calculator.pressDigit(digit);
  render();
};
window.calcDot = () => {
  calculator.pressDot();
  render();
};
window.calcOp = (op) => {
  calculator.pressOp(op);
  render();
};
window.calcEquals = () => {
  calculator.pressEquals();
  render();
};
window.calcClear = () => {
  calculator.clear();
  render();
};
window.calcToggleSign = () => {
  calculator.toggleSign();
  render();
};
window.calcPercent = () => {
  calculator.percent();
  render();
};
