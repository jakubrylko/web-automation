import * as Selectors from './Alerts.selectors'

export const assertAlertWasCalledWith = (text: string) => {
  return cy
    .get('@alert', { timeout: 5000 })
    .should('have.been.calledWith', text)
}

export const assertAlertText = (text: string, { window }: Windows) => {
  cy.on(`window:${window}`, (string) => {
    expect(string).to.equal(text)
  })
}

export const assertAlertResult = (text: string, { window }: Windows) => {
  const selector =
    window === 'confirm' ? Selectors.confirmResult() : Selectors.promptResult()
  selector.shouldHaveText(text)
}
