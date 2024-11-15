export const assertAddedCard = ({ cardOwner }: { cardOwner: string }) => {
  cy.contains(cardOwner).shouldBeVisible()
}
