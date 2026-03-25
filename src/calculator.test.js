import assert from "assert";
import { add, subtract } from "./calculator.js";
import { createCalculatorEngine } from "./calculator-engine.js";

function runTest(name, fn) {
  try {
    fn();
    console.log(`PASS: ${name}`);
  } catch (error) {
    console.error(`FAIL: ${name}`);
    console.error(error.message);
    process.exitCode = 1;
  }
}

runTest("add returns the sum of two numbers", () => {
  assert.strictEqual(add(2, 3), 5);
});

runTest("subtract returns the difference of two numbers", () => {
  assert.strictEqual(subtract(10, 4), 6);
});

runTest("supports negative values", () => {
  assert.strictEqual(add(-2, 5), 3);
  assert.strictEqual(subtract(-2, -3), 1);
});

runTest("supports decimals", () => {
  assert.ok(Math.abs(add(0.1, 0.2) - 0.3) < Number.EPSILON * 10);
  assert.ok(Math.abs(subtract(1.5, 0.4) - 1.1) < Number.EPSILON * 10);
});

runTest("all digit buttons 0-9 update display", () => {
  for (let n = 0; n <= 9; n += 1) {
    const engine = createCalculatorEngine();
    engine.pressDigit(String(n));
    assert.strictEqual(engine.getState().display, String(n));
  }
});

runTest("dot button appends decimal once", () => {
  const engine = createCalculatorEngine();
  engine.pressDigit("1");
  engine.pressDot();
  engine.pressDot();
  engine.pressDigit("5");
  assert.strictEqual(engine.getState().display, "1.5");
});

runTest("plus button with equals computes total", () => {
  const engine = createCalculatorEngine();
  engine.pressDigit("7");
  engine.pressOp("+");
  engine.pressDigit("8");
  engine.pressEquals();
  assert.strictEqual(engine.getState().display, "15");
});

runTest("minus button with equals computes difference", () => {
  const engine = createCalculatorEngine();
  engine.pressDigit("9");
  engine.pressOp("−");
  engine.pressDigit("4");
  engine.pressEquals();
  assert.strictEqual(engine.getState().display, "5");
});

runTest("multiply button with equals computes product", () => {
  const engine = createCalculatorEngine();
  engine.pressDigit("6");
  engine.pressOp("×");
  engine.pressDigit("7");
  engine.pressEquals();
  assert.strictEqual(engine.getState().display, "42");
});

runTest("divide button with equals computes quotient", () => {
  const engine = createCalculatorEngine();
  engine.pressDigit("8");
  engine.pressDigit("4");
  engine.pressOp("÷");
  engine.pressDigit("2");
  engine.pressDigit("1");
  engine.pressEquals();
  assert.strictEqual(engine.getState().display, "4");
});

runTest("clear button resets calculator", () => {
  const engine = createCalculatorEngine();
  engine.pressDigit("5");
  engine.pressAction("clear");
  assert.strictEqual(engine.getState().display, "0");
  assert.strictEqual(engine.getState().expression, "");
});

runTest("toggle sign button flips sign", () => {
  const engine = createCalculatorEngine();
  engine.pressDigit("8");
  engine.pressAction("toggle-sign");
  assert.strictEqual(engine.getState().display, "-8");
});

runTest("percent button converts value to percent", () => {
  const engine = createCalculatorEngine();
  engine.pressDigit("5");
  engine.pressDigit("0");
  engine.pressAction("percent");
  assert.strictEqual(engine.getState().display, "0.5");
});

if (!process.exitCode) {
  console.log("All tests passed.");
}
