# Calculator

A calculator web app built with Vite and tested end-to-end with Python + Behave + Playwright.

The main purpose of this project is to demonstrate behavior-driven testing of a UI app using BDD Feature files (Gherkin) with Python step definitions, Behave as the BDD engine, and Playwright for browser automation through a Page Object Model.

All application code and all tests in this repository were written 100% by GitHub Copilot.

GitHub Copilot was also used to pull in and configure all required technology modules for this project, including Playwright, BDD tooling, and the CI/CD pipeline.

This entire README file was created and is maintained via GitHub Copilot.

## Prerequisites

- Node.js 24+
- npm 11+
- Python 3.10+

## Install

```bash
npm install
python -m pip install -r requirements.txt
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

Run E2E tests (Behave + Playwright):

```bash
npm run test:e2e
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
		run-tests.js
		main.js
	tests/
		e2e/
			features/
				calculator.feature
				environment.py
				pages/
					calculator_page.py
				steps/
					calculator_steps.py
	index.html
	behave.ini
	requirements.txt
	package.json
	package-lock.json
	.gitignore
	README.md
```
