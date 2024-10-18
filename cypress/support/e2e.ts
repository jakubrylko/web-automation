import './commands'
import 'allure-cypress'
import 'cypress-plugin-api'

beforeEach(() => {
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: true })
})

Cypress.on('uncaught:exception', () => false)
