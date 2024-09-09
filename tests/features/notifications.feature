Feature: Slack notifications

  Scenario: Existing user gets Slack Message
    Given User exists
    When /greet API is called with existing user id in body
    Then Slack API is called to post message for user

  Scenario: Filters out not existing user
    Given User does not exist
    When /greet API is called with not existing user id in body
    Then 404 is returned and Slack is not called
