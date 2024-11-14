Feature: Windows

  Background:
    Given I am on the windows page

  Scenario: Should open new tab
    When I click the "first" button
    Then A new "tab" should open
    And I should see the heading text

  Scenario: Should open new window
    When I click the "second" button
    Then A new "window" should open
    And I should see the heading text

  Scenario: Should open new message window
    When I click the "third" button
    Then A new "message window" should open
    And I should see the message text
