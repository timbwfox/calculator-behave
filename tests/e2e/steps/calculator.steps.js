import { createBdd } from "playwright-bdd";
import { CalculatorPage } from "../pages/calculator.page.js";

const { Given, When, Then } = createBdd();

Given("the calculator page is open", async ({ page }) => {
  const calculator = new CalculatorPage(page);
  await calculator.goto();
});

When("I press {string}", async ({ page }, buttonSequence) => {
  const calculator = new CalculatorPage(page);

  const buttons = [];
  for (let i = 0; i < buttonSequence.length; i += 1) {
    if (buttonSequence.slice(i, i + 3) === "+/-") {
      buttons.push("+/-");
      i += 2;
    } else {
      buttons.push(buttonSequence[i]);
    }
  }

  for (const button of buttons) {
    await calculator.pressButton(button);
  }
});

Then("the display shows {string}", async ({ page }, result) => {
  const calculator = new CalculatorPage(page);
  await calculator.assertResult(result);
});
