Feature: Add Task

  As a user,
  I want to test the add task feature,
  So that I can ensure it works correctly.

  Background:
    Given I am on the board page

  Scenario: Add a task
    When I add a task
    Then I should see the task in the list

  Scenario: Edit a task
    When I edit a task
    Then I should see the updated task in the list

  Scenario: Remove a task
    When I remove a task
    Then I should not see the task in the list

  Scenario: Remove all tasks from a column
    When I remove all tasks from a column
    Then I should not see any tasks in the column

  Scenario: Change for list view
    When I change to list view
    Then I should see the tasks in lists
