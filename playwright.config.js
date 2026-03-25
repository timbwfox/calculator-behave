import { defineConfig } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const testDir = defineBddConfig({
  features: "./tests/e2e/features/*.feature",
  steps: "./tests/e2e/steps/*.js",
});

export default defineConfig({
  testDir,
  timeout: 30_000,
  reporter: process.env.CI
    ? [
        ["list"],
        ["json", { outputFile: "artifacts/e2e/results.json" }],
        ["junit", { outputFile: "artifacts/e2e/junit.xml" }],
        ["html", { outputFolder: "playwright-report", open: "never" }],
      ]
    : [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    headless: !!process.env.CI,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
