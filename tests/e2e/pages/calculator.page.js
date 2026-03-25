import { expect } from "@playwright/test";

export class CalculatorPage {
  constructor(page) {
    this.page = page;
    this.result = page.locator("#result");
  }

  async goto() {
    await this.page.goto("/");
  }

  async pressButton(button) {
    await this.page.locator(`[data-button="${button}"]`).click();
  }

  async assertResult(expected) {
    await expect(this.result).toHaveText(expected);
  }
}
