import * as Home from '../Homepage'
import * as Selectors from './Login.selectors'

export const open = () => {
  cy.visit(Cypress.env('SAAS_URL'))
}

export const signIn = ({
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
    signIn({ email, password })
    Home.assertWelcomeMessage()
  })
}
