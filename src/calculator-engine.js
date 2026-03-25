import { add, subtract } from "./calculator.js";

export function createCalculatorEngine() {
  let display = "0";
  let operand = null;
  let operator = null;
  let waitNext = false;
  let expression = "";

  function parseDisplay() {
    const value = parseFloat(display);
    return Number.isNaN(value) ? 0 : value;
  }

  function setDisplay(value) {
    display = String(value);
  }

  function applyOp(a, op, b) {
    if (op === "+") return add(a, b);
    if (op === "-") return subtract(a, b);
    if (op === "x") return a * b;
    if (op === "/") return b !== 0 ? a / b : "Error";
    return b;
  }

  function pressDigit(digit) {
    if (waitNext) {
      setDisplay(digit);
      waitNext = false;
      return;
    }

    setDisplay(display === "0" ? digit : display + digit);
  }

  function pressDot() {
    if (waitNext) {
      setDisplay("0.");
      waitNext = false;
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  }

  function pressOp(op) {
    const current = parseDisplay();

    if (operand !== null && !waitNext) {
      const result = applyOp(operand, operator, current);
      expression = `${operand} ${operator} ${current} =`;
      setDisplay(result);
      operand = Number(result);
    } else {
      operand = current;
    }

    operator = op;
    waitNext = true;
  }

  function pressEquals() {
    if (operand === null || operator === null) {
      return;
    }

    const current = parseDisplay();
    const result = applyOp(operand, operator, current);
    expression = `${operand} ${operator} ${current} =`;
    setDisplay(result);
    operand = null;
    operator = null;
    waitNext = true;
  }

  function clear() {
    setDisplay("0");
    operand = null;
    operator = null;
    waitNext = false;
    expression = "";
  }

  function toggleSign() {
    setDisplay(parseDisplay() * -1);
  }

  function percent() {
    setDisplay(parseDisplay() / 100);
  }

  function pressAction(action) {
    if (action === "dot") pressDot();
    if (action === "equals") pressEquals();
    if (action === "clear") clear();
    if (action === "toggle-sign") toggleSign();
    if (action === "percent") percent();
  }

  function getState() {
    return { display, expression };
  }

  return {
    pressDigit,
    pressDot,
    pressOp,
    pressEquals,
    clear,
    toggleSign,
    percent,
    pressAction,
    getState,
  };
}
