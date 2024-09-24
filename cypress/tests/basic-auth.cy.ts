const BASIC_AUTH = {
  auth: {
    username: Cypress.env('TEAMDECK_USERNAME'),
    password: Cypress.env('TEAMDECK_PASSWORD')
  }
}

describe('Basic auth', () => {
  it('Should login to the app with basic auth', () => {
    cy.visit(Cypress.env('TEAMDECK_URL'), BASIC_AUTH)
    cy.get('#usercom-launcher-dot-frame').should('be.visible')
  })
})
