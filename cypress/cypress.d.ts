declare namespace Cypress {
  interface Chainable<Subject = JQuery<HTMLElement>> {
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>
    shouldBeChecked(): Chainable<Subject>
    shouldBeVisible(): Chainable<Subject>
    shouldHaveText(text: string): Chainable<Subject>
  }
}
