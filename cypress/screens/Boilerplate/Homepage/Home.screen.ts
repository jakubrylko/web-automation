export const open = () => {
  cy.visit(Cypress.env('SAAS_URL'))
}

export const clickOnNavigationItem = (item: string) => {
  cy.get('nav').contains(item).click()
}

export const clickOnMenuTile = (item: string) => {
  cy.get('h4').contains(item).click()
}
