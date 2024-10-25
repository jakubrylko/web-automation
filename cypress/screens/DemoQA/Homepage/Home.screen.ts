export const clickOnMenuCard = (card: string) => {
  cy.get('.card').contains(card).click()
}
