import * as Home from 'cypress/screens/Teamdeck/Homepage'

const { env } = Cypress

const BASIC_AUTH = {
  auth: {
    username: env('TEAMDECK_USERNAME'),
    password: env('TEAMDECK_PASSWORD')
  }
}

describe('Teamdeck login', () => {
  it('Should login to the app with basic auth', () => {
    cy.visit(env('TEAMDECK_URL'), BASIC_AUTH)
    Home.userWidget().shouldBeVisible()
  })
})
