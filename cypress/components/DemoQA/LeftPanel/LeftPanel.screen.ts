export const clickOnMenuItem = (item: string) => {
  cy.contains(item).click()
}
