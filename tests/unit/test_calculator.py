import json
import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
BRIDGE = ROOT / "tests" / "unit" / "js_bridge.mjs"


def run_js(payload):
    result = subprocess.run(
        ["node", str(BRIDGE)],
        input=json.dumps(payload),
        text=True,
        capture_output=True,
        cwd=ROOT,
        check=False,
    )

    if result.returncode != 0:
        raise AssertionError(
            "Node bridge failed:\n"
            f"stdout: {result.stdout}\n"
            f"stderr: {result.stderr}"
        )

    return json.loads(result.stdout)


class CalculatorUnitTests(unittest.TestCase):
    def test_add_returns_sum(self):
        actual = run_js({"kind": "add", "a": 2, "b": 3})["value"]
        self.assertEqual(actual, 5)

    def test_subtract_returns_difference(self):
        actual = run_js({"kind": "subtract", "a": 10, "b": 4})["value"]
        self.assertEqual(actual, 6)

    def test_supports_negative_values(self):
        add_actual = run_js({"kind": "add", "a": -2, "b": 5})["value"]
        subtract_actual = run_js({"kind": "subtract", "a": -2, "b": -3})["value"]
        self.assertEqual(add_actual, 3)
        self.assertEqual(subtract_actual, 1)

    def test_supports_decimals(self):
        add_actual = run_js({"kind": "add", "a": 0.1, "b": 0.2})["value"]
        subtract_actual = run_js({"kind": "subtract", "a": 1.5, "b": 0.4})["value"]
        self.assertAlmostEqual(add_actual, 0.3, places=12)
        self.assertAlmostEqual(subtract_actual, 1.1, places=12)

    def test_all_digits_update_display(self):
        for n in range(10):
            with self.subTest(digit=n):
                state = run_js(
                    {
                        "kind": "engine-sequence",
                        "actions": [{"type": "digit", "value": str(n)}],
                    }
                )
                self.assertEqual(state["display"], str(n))

    def test_dot_appends_decimal_once(self):
        state = run_js(
            {
                "kind": "engine-sequence",
                "actions": [
                    {"type": "digit", "value": "1"},
                    {"type": "dot"},
                    {"type": "dot"},
                    {"type": "digit", "value": "5"},
                ],
            }
        )
        self.assertEqual(state["display"], "1.5")

    def test_plus_with_equals(self):
        state = run_js(
            {
                "kind": "engine-sequence",
                "actions": [
                    {"type": "digit", "value": "7"},
                    {"type": "op", "value": "+"},
                    {"type": "digit", "value": "8"},
                    {"type": "equals"},
                ],
            }
        )
        self.assertEqual(state["display"], "15")

    def test_minus_with_equals(self):
        state = run_js(
            {
                "kind": "engine-sequence",
                "actions": [
                    {"type": "digit", "value": "9"},
                    {"type": "op", "value": "-"},
                    {"type": "digit", "value": "4"},
                    {"type": "equals"},
                ],
            }
        )
        self.assertEqual(state["display"], "5")

    def test_multiply_with_equals(self):
        state = run_js(
            {
                "kind": "engine-sequence",
                "actions": [
                    {"type": "digit", "value": "6"},
                    {"type": "op", "value": "x"},
                    {"type": "digit", "value": "7"},
                    {"type": "equals"},
                ],
            }
        )
        self.assertEqual(state["display"], "42")

    def test_divide_with_equals(self):
        state = run_js(
            {
                "kind": "engine-sequence",
                "actions": [
                    {"type": "digit", "value": "8"},
                    {"type": "digit", "value": "4"},
                    {"type": "op", "value": "/"},
                    {"type": "digit", "value": "2"},
                    {"type": "digit", "value": "1"},
                    {"type": "equals"},
                ],
            }
        )
        self.assertEqual(state["display"], "4")

    def test_clear_resets_calculator(self):
        state = run_js(
            {
                "kind": "engine-sequence",
                "actions": [
                    {"type": "digit", "value": "5"},
                    {"type": "action", "value": "clear"},
                ],
            }
        )
        self.assertEqual(state["display"], "0")
        self.assertEqual(state["expression"], "")

    def test_toggle_sign_flips_sign(self):
        state = run_js(
            {
                "kind": "engine-sequence",
                "actions": [
                    {"type": "digit", "value": "8"},
                    {"type": "action", "value": "toggle-sign"},
                ],
            }
        )
        self.assertEqual(state["display"], "-8")

    def test_percent_converts_value(self):
        state = run_js(
            {
                "kind": "engine-sequence",
                "actions": [
                    {"type": "digit", "value": "5"},
                    {"type": "digit", "value": "0"},
                    {"type": "action", "value": "percent"},
                ],
            }
        )
        self.assertEqual(state["display"], "0.5")


if __name__ == "__main__":
    unittest.main()
