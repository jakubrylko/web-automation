const { env } = Cypress

const BASIC_AUTH = {
  auth: {
    username: env('TEAMDECK_USERNAME'),
    password: env('TEAMDECK_PASSWORD')
  }
}

describe('Basic auth', () => {
  it('Should login to the app with basic auth', () => {
    cy.visit(env('TEAMDECK_URL'), BASIC_AUTH)
    cy.get('#usercom-launcher-dot-frame').should('be.visible')
  })
})
