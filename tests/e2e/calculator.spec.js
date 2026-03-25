import { test } from "@playwright/test";
import { CalculatorPage } from "./pages/calculator.page.js";

test("calculator computes 2 + 3 = 5", async ({ page }) => {
  const calculator = new CalculatorPage(page);
  await calculator.goto();

  await calculator.pressButton("2");
  await calculator.pressButton("+");
  await calculator.pressButton("3");
  await calculator.pressButton("=");

  await calculator.assertResult("5");
});
