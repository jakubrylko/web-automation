declare namespace Cypress {
  interface Chainable<Subject = JQuery<HTMLElement>> {
    shouldBeVisible(): Chainable<Subject>
    shouldBeChecked(): Chainable<Subject>
  }
}
