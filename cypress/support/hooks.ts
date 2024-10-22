beforeEach('Set API logs in Cypress runner', () => {
  cy.intercept({ resourceType: /xhr|fetch/ }, { log: true })
})
