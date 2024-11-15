Cypress.Commands.add(
  'shouldBeVisible',
  { prevSubject: 'element' },
  (subject, timeout?) => {
    cy.wrap(subject).should('be.visible', { timeout })
  }
)

Cypress.Commands.add(
  'shouldBeChecked',
  { prevSubject: 'element' },
  (subject) => {
    cy.wrap(subject).should('be.checked')
  }
)

Cypress.Commands.add(
  'shouldHaveText',
  { prevSubject: 'element' },
  (subject, text) => {
    cy.wrap(subject).should('have.text', text)
  }
)
