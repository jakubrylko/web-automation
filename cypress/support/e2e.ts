import './commands'
import './hooks'
import '/common/helpers'
import 'allure-cypress'
import 'cypress-plugin-api'

Cypress.on('uncaught:exception', () => false)
