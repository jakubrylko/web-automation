export const bellWithDot = () => cy.get('.lucide-bell-dot')
export const notification = () => cy.get('[role="link"]')
export const notificationBell = () =>
  cy.getByTestId('notifications-trigger-testid')
export const notificationList = () => cy.get('[role="dialog"]')
export const toast = () => cy.getByTestId('toast-1')
