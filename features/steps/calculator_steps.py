from behave import given, when, then
from features.pages.calculator_page import CalculatorPage


def parse_button_sequence(sequence):
    """Parse button sequence string, treating '+/-' as a single token."""
    buttons = []
    i = 0
    while i < len(sequence):
        if sequence[i:i + 3] == "+/-":
            buttons.append("+/-")
            i += 3
        else:
            buttons.append(sequence[i])
            i += 1
    return buttons


@given("the calculator page is open")
def step_open_calculator(context):
    context.calculator = CalculatorPage(context.page)
    context.calculator.goto()


@when('I press "{button_sequence}"')
def step_press_buttons(context, button_sequence):
    for button in parse_button_sequence(button_sequence):
        context.calculator.press_button(button)


@then('the display shows "{result}"')
def step_assert_display(context, result):
    context.calculator.assert_result(result)
