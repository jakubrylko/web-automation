import * as Selectors from './Payments.selectors'

export const selectPaymentAmount = (amount: PaymentAmount) => {
  cy.contains(`$${amount}`).click({ force: true })
}

const fillIframeInput = ({
  iframeIndex,
  data
}: {
  iframeIndex: number
  data: string
}) => {
  Selectors.iframe()
    .eq(iframeIndex)
    .its('0.contentDocument.body')
    .shouldNotBeEmpty()
    .then(cy.wrap)
    .find('.InputElement')
    .type(data)
}

export const fillCardDetails = (cardDetails: CardDetails) => {
  const { cardOwner, cardNumber, cardExpiry, cardCvc } = cardDetails
  Selectors.cardOwner().type(cardOwner)
  fillIframeInput({ iframeIndex: 0, data: cardNumber })
  fillIframeInput({ iframeIndex: 1, data: cardExpiry })
  fillIframeInput({ iframeIndex: 2, data: cardCvc })
}

export const removeAddedCard = () => {
  Selectors.trashIcon().click()
  Selectors.trashIcon().should('not.exist')
}
