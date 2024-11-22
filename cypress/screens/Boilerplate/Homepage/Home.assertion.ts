import { WELCOME_MESSAGE } from '@common/test-data'
import * as Selectors from './Home.selectors'

export const assertToastMessage = () => {
  Selectors.toast().shouldBeVisible()
  Selectors.toast().should('not.exist')
}

export const assertWelcomeMessage = () => {
  cy.contains(WELCOME_MESSAGE).shouldBeVisible()
}

export const assertNotificationList = ({ count }: { count: number }) => {
  Selectors.notificationList().shouldBeVisible()
  Selectors.notification().should('have.length', count)
}

export const assertAllNotificationsAreRead = () => {
  Selectors.notification().each(($notification) =>
    cy.wrap($notification).should('have.attr', 'data-status', 'read')
  )
  Selectors.bellWithDot().should('not.exist')
}
