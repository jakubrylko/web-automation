export const clickOnMenuItem = (card: string) => {
  cy.contains(card).click()
}
