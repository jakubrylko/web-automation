import '@common/helpers'
import 'allure-cypress'
import 'cypress-plugin-api'
import './assertions'
import './hooks'

Cypress.on('uncaught:exception', () => false)
