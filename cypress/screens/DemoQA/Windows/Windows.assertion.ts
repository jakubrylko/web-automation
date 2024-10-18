import * as Selectors from './Windows.selectors'

export const assertWindowWasCalled = () => {
  cy.get('@window').should('be.calledOnce')
}

export const assertNewWindowHeader = ({ text }: { text: string }) => {
  Selectors.sampleHeader().shouldHaveText(text)
}

export const assertNewWindowBody = ({ text }: { text: string }) => {
  cy.get('body').contains(text)
}
