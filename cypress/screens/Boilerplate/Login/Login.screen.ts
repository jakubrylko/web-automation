import * as Home from '../Homepage'
import * as Selectors from './Login.selectors'

export const open = () => {
  cy.visit(Cypress.env('SAAS_URL'))
}

export const authenticate = ({
  email,
  password
}: {
  email: string
  password: string
}) => {
  Selectors.email().type(email)
  Selectors.password().type(password)
  Selectors.loginButton().click()
}

export const createSession = (authData: SessionData) => {
  const { sessionId, email, password } = authData
  cy.session(sessionId, () => {
    open()
    authenticate({ email, password })
    Home.assertWelcomeMessage()
  })
}
