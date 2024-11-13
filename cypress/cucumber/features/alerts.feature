Feature: Alerts

  Background:
    Given I am on the alerts page

  Scenario: Should display an alert
    When I click the "first" Click me button
    Then An alert should appear

  Scenario: Should display an alert with timer
    When I click the "second" Click me button
    Then An alert should appear after 5 seconds

  Scenario: Should display a confirm box
    When I click the "third" Click me button
    And I click "<button>" in the confirm box
    Then I should see the result - You selected "<button>"

    Examples:
      | button |
      | Ok     |
      | Cancel |

  Scenario: Should display a prompt box
    When I click the "fourth" Click me button
    And I type "<text>" in the prompt box
    Then I should see the result - You entered "<text>"

    Examples:
      | text    |
      | Testing |
      | 12345   |
      | !@#$&*  |
