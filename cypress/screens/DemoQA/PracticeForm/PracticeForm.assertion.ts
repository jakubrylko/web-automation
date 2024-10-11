export const assertSubject = (subject: string) => {
  cy.contains(subject).shouldBeVisible()
}

export const assertSubmissionTitle = (title: string) => {
  cy.contains(title).shouldBeVisible()
}
