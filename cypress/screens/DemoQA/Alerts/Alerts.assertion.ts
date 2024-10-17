import * as Selectors from './Alerts.selectors'

export const assertAlert = (text: string) => {
  cy.on('window:alert', (string) => {
    expect(string).to.equal(text)
  })
}

export const assertAlertWasCalledWith = (text: string) => {
  return cy
    .get('@alert', { timeout: 5000 })
    .should('have.been.calledWith', text)
}

export const assertConfirmBox = (text: string) => {
  cy.on('window:confirm', (string) => {
    expect(string).to.equal(text)
  })
}

export const assertConfirmBoxResult = (text: string) => {
  Selectors.confirmResult().shouldHaveText(text)
}

export const assertPromptBoxResult = (text: string) => {
  Selectors.promptResult().shouldHaveText(`You entered ${text}`)
}
