export const clickOnMenuCard = (card: string) => {
  cy.contains(card).click()
}
