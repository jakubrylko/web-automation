import * as Selectors from './PracticeForm.selectors'

export const assertSubmissionTitle = (title: string) => {
  cy.contains(title).shouldBeVisible()
}

export const assertSubmittedData = () => {
  Selectors.valueCell().each(($cell) => {
    cy.wrap($cell).shouldNotBeEmpty()
  })
}
