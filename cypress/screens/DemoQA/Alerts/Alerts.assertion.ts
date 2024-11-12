import * as Selectors from './Alerts.selectors'

export const assertAlertWasCalledWith = (text: string) => {
  return cy
    .get('@alert', { timeout: 5000 })
    .should('have.been.calledWith', text)
}

export const assertAlertText = (text: string, { type }: Alert) => {
  cy.on(`window:${type}`, (string) => {
    expect(string).to.equal(text)
  })
}

export const assertAlertResult = (text: string, { type }: Alert) => {
  const selector =
    type === 'confirm' ? Selectors.confirmResult() : Selectors.promptResult()
  selector.shouldHaveText(text)
}
