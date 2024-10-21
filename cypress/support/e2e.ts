import './commands'
import './hooks'
import 'allure-cypress'
import 'cypress-plugin-api'

Cypress.on('uncaught:exception', () => false)
