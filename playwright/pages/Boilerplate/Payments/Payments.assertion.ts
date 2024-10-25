import { Page } from '@playwright/test'
import { PaymentsPage } from './Payments.page'

export class PaymentsAssertion extends PaymentsPage {
  constructor(page: Page) {
    super(page)
  }

  async assertAddedCard({ cardOwner }: { cardOwner: string }) {
    await this.assert.shouldBeVisible(this.page.getByText(cardOwner))
  }
}
