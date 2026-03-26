import assert from "assert";
import { add, subtract } from "./calculator.js";

describe("calculator math", () => {
  it("add returns the sum of two numbers", () => {
    assert.strictEqual(add(2, 3), 5);
  });

  it("subtract returns the difference of two numbers", () => {
    assert.strictEqual(subtract(10, 4), 6);
  });

  it("supports negative values", () => {
    assert.strictEqual(add(-2, 5), 3);
    assert.strictEqual(subtract(-2, -3), 1);
  });

  it("supports decimals", () => {
    assert.ok(Math.abs(add(0.1, 0.2) - 0.3) < Number.EPSILON * 10);
    assert.ok(Math.abs(subtract(1.5, 0.4) - 1.1) < Number.EPSILON * 10);
  });
});
