export const assertSubmissionTitle = (title: string) => {
  cy.contains(title).shouldBeVisible()
}
