declare namespace Cypress {
  interface Chainable<Subject = JQuery<HTMLElement>> {
    shouldBeVisible(): Chainable<Subject>
    shouldBeChecked(): Chainable<Subject>
    shouldHaveText(text: string): Chainable<Subject>
  }
}
