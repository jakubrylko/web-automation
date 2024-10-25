import { Page } from '@playwright/test'
import { StripeSelectors } from './Stripe.selectors'

export class StripeAssertion extends StripeSelectors {
  constructor(page: Page) {
    super(page)
  }

  async assertConfirmMessage(message: string) {
    await this.assert.shouldBeVisible(this.iframe.getByText(message))
  }
}
