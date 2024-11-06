Feature: Alerts

  Scenario: Should display an alert
    Given I am on the homepage
    When I navigate to the alerts page
    And I click the "first" Click me button
    Then An alert should appear

  Scenario: Should display an alert with timer
    Given I am on the homepage
    When I navigate to the alerts page
    And I click the "second" Click me button
    Then An alert should appear after 5 seconds

  Scenario: Should display a confirm box
    Given I am on the homepage
    When I navigate to the alerts page
    And I click the "third" Click me button
    Then A confirm box should appear
    And I should see a confirmation result

  Scenario: Should display a prompt box
    Given I am on the homepage
    When I navigate to the alerts page
    And I click the "fourth" Click me button
    Then A prompt box should appear
    And I should see the result of the prompt