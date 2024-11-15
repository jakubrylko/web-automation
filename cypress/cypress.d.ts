declare namespace Cypress {
  interface Chainable<Subject = JQuery<HTMLElement>> {
    shouldBeChecked(): Chainable<Subject>
    shouldBeVisible(): Chainable<Subject>
    shouldHaveText(text: string): Chainable<Subject>
    shouldNotBeEmpty(): Chainable<Subject>
  }
}
