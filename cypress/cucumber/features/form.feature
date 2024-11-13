Feature: Practice Form

  Scenario: Should fill and submit practice form
    Given I am on the practice form page
    When I fill out the entire form with valid data
    And I submit the form
    Then I should see a confirmation message
    And I should see a table displaying the submitted data
