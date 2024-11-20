import { WELCOME_MESSAGE } from '@common/test-data'
import * as Selectors from './Home.selectors'

export const assertToastMessage = () => {
  Selectors.toast().shouldBeVisible()
  Selectors.toast().should('not.exist')
}

export const assertWelcomeMessage = () => {
  cy.contains(WELCOME_MESSAGE).shouldBeVisible()
}
