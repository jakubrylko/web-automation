import * as Selectors from './Home.selectors'

export const closeCookieBanner = () => {
  cy.wait(250)
  Selectors.cookieButton().click()
  Selectors.cookieButton().should('not.be.visible')
}
