import '@common/helpers'
import 'allure-cypress'
import 'cypress-plugin-api'
import './commands'
import './hooks'

Cypress.on('uncaught:exception', () => false)
