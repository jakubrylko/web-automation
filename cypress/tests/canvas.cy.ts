const BASIC_AUTH = {
  auth: {
    username: Cypress.env('TEAMDECK_USERNAME'),
    password: Cypress.env('TEAMDECK_PASSWORD')
  }
}

describe('Canvas', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('TEAMDECK_URL'), BASIC_AUTH)
  })

  it('Should interact with canvas', () => {
    cy.get('[type="email"]').type(Cypress.env('EMAIL'))
    cy.get('[type="password"]').type(Cypress.env('PASSWORD'))
    cy.get('[type="submit"]').click()
  })
})
