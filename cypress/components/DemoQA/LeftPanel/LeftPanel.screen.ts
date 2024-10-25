export const clickOnMenuItem = (item: string) => {
  cy.get('.btn').contains(item).click()
}
