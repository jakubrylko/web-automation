import * as Home from 'cypress/screens/Boilerplate/Homepage'
import * as Login from 'cypress/screens/Boilerplate/Login'

const { env } = Cypress

const authData = {
  sessionId: `auth-${Date.now()}`,
  email: env('EMAIL'),
  password: env('PASSWORD')
}

describe('Boilerplate session', () => {
  beforeEach(() => {
    Login.createSession(authData)
    Login.open()
  })

  it('Should navigate to payments', () => {
    Home.clickOnNavigationItem('Payments')
    cy.url().should('contain', 'payment-confirm')
  })

  it('Should navigate to subscriptions', () => {
    Home.clickOnNavigationItem('Subscriptions')
    cy.url().should('contain', 'subscriptions')
  })

  it('Should navigate to documents', () => {
    Home.clickOnNavigationItem('Documents')
    cy.url().should('contain', 'documents')
  })

  it('Should navigate to CRUD', () => {
    Home.clickOnNavigationItem('CRUD')
    cy.url().should('contain', 'crud-demo-item')
  })
})
