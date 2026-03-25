import os


class CalculatorPage:
    BASE_URL = os.environ.get("BASE_URL", "http://127.0.0.1:4173")

    def __init__(self, page):
        self.page = page
        self.result = page.locator("#result")

    def goto(self):
        self.page.goto(self.BASE_URL)

    def press_button(self, button):
        self.page.locator(f'[data-button="{button}"]').click()

    def assert_result(self, expected):
        self.result.wait_for()
        assert self.result.inner_text() == expected, (
            f"Expected '{expected}' but got '{self.result.inner_text()}'"
        )
