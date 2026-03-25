import os


class CalculatorPage:
    def __init__(self, page):
        self.page = page
        self.result = page.locator("#result")

    def goto(self):
        base_url = os.environ.get("BASE_URL", "http://127.0.0.1:4173")
        self.page.goto(base_url)

    def press_button(self, button):
        self.page.locator(f'[data-button="{button}"]').click()

    def assert_result(self, expected):
        actual = self.result.inner_text()
        assert actual == expected, f"Expected '{expected}' but got '{actual}'"
