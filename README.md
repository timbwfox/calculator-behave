# Calculator

A calculator web app built with Vite and tested end-to-end with Playwright.

The main purpose of this project is to demonstrate behavior-driven testing of a UI app using BDD Feature files (Gherkin) plus Playwright step definitions and a Page Object Model.

All application code and all tests in this repository were written 100% by GitHub Copilot.

GitHub Copilot was also used to pull in and configure all required technology modules for this project, including Playwright, BDD tooling, and the CI/CD pipeline.

This entire README file was created and is maintained via GitHub Copilot.

## Prerequisites

- Node.js 24+
- npm 11+

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Test Commands

Run unit tests:

```bash
npm test
```

Generate BDD tests from feature files:

```bash
npm run bddgen
```

Run E2E tests (BDD + Playwright):

```bash
npm run test:e2e
```

Run E2E tests in headed mode:

```bash
npm run test:e2e:headed
```

## CI/CD

GitHub Actions workflow:

- Builds the app
- Runs all unit tests
- Runs all BDD E2E tests
- Uploads the build artifact (`dist`)
- Uploads test artifacts for each run (`test-artifacts`), including:
	- unit test log: `artifacts/logs/unit-tests.log`
	- e2e test log: `artifacts/logs/e2e-tests.log`
	- Playwright JSON + JUnit reports: `artifacts/e2e/`
	- Playwright HTML report: `playwright-report/`
	- Playwright runtime output: `test-results/`

Workflow file: `.github/workflows/ci-cd.yml`

## Project Structure

```text
calculator/
	.github/
		workflows/
			ci-cd.yml
	public/
	src/
		styles/
			main.css
		bootstrap.js
		calculator.js
		calculator-app.js
		calculator-engine.js
		calculator.test.js
		calculator.unit.test.js
		calculator.buttons.test.js
		main.js
		run-tests.js
	tests/
		e2e/
			features/
				calculator.feature
			steps/
				calculator.steps.js
			pages/
				calculator.page.js
			calculator.spec.js
	index.html
	playwright.config.js
	package.json
	package-lock.json
	.gitignore
	README.md
```
