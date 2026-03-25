Feature: Calculator arithmetic

  Scenario Outline: Compute expression from button sequence
    Given the calculator page is open
    When I press "<buttons>"
    Then the display shows "<result>"

    Examples:
      | buttons     | result     |
      | 3+4=        | 7          |
      | 9-5=        | 4          |
      | 6x7=        | 42         |
      | 8/2=        | 4          |
      | 8/0=        | Error      |
      | 1.5+2.5=    | 4          |
      | 50%         | 0.5        |
      | 8+/-        | -8         |
      | 9C          | 0          |
      | 1234567890  | 1234567890 |
