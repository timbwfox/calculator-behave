import assert from "assert";
import { add, subtract } from "./calculator.js";

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
