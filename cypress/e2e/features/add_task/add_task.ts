import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor'

Given('I am on the board page', () => {
  cy.visit('http://localhost:3000')
  cy.get('[data-cy="board-page"]').should('be.visible')
})

When('I add a task', () => {
  cy.get('button[data-cy="button-new-task"]').click()
  cy.get('[data-cy="modal"]').should('be.visible')
  cy.get('input[data-cy="task-title"]').type('Sample Task')
  cy.get('select[data-cy="task-priority"]').last().select('High')
  cy.get('button').contains('Save Task').click()
})

Then('I should see the task in the list', () => {
  cy.contains('[data-cy="task-item-title"]', 'Sample Task').should('be.visible')
})

When('I add another task', () => {
  cy.get('button[data-cy="button-new-task"]').click()
  cy.get('[data-cy="modal"]').should('be.visible')
  cy.get('input[data-cy="task-title"]').type('Another Task')
  cy.get('select').last().select('Medium')
  cy.get('button').contains('Save Task').click()
})

When('I edit a task', () => {
  cy.get('[data-cy="task-item"]').first().dblclick()
  cy.get('input[placeholder="Title"]').clear().type('Updated Task')
  cy.get('button').contains('Save Task').click()
})

Then('I should see the updated task in the list', () => {
  cy.get('[data-cy="task-item"]').first().should('contain', 'Updated Task')
})

When('I remove a task', () => {
  cy.get('[data-cy="task-item"]')
    .first()
    .find('button[title="Delete Task"]')
    .click()
})

Then('I should not see the task in the list', () => {
  cy.get('[data-cy="task-item"]').should('not.contain', 'Sample Task')
})

When('I remove all tasks from a column', () => {
  cy.get('[data-cy="column-item"]')
    .first()
    .find('button[data-cy="button-dropdown"]')
    .click()

  cy.get('[data-cy="column-item"]')
    .first()
    .find('button[data-cy="button-column-remove-all"]')
    .click()
})

Then('I should not see any tasks in the column', () => {
  cy.get('[data-cy="column-item"]')
    .first()
    .find('[data-cy="task-item"]')
    .should('not.exist')
})

When('I change to list view', () => {
  cy.get('button[data-cy="button-tab-list"]').click()
})

Then('I should see the tasks in lists', () => {
  cy.get('[data-cy="list-page"]').should('be.visible')
})
