import 'allure-cypress'
import 'cypress-plugin-api'
import './assertions'
import './commands'
import './hooks'

Cypress.on('uncaught:exception', () => false)
