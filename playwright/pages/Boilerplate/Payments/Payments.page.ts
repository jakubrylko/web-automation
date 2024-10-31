import { Page } from '@playwright/test'
import { PaymentsSelectors } from './Payments.selectors'

export class PaymentsPage extends PaymentsSelectors {
  constructor(page: Page) {
    super(page)
  }

  async selectPaymentAmount(amount: '5' | '10' | '15') {
    await this.page.getByText(`$${amount}`).click({ force: true })
  }

  async removeSavedCard({ cardOwner }: { cardOwner: string }) {
    await this.trashIcon.click({ force: true })
    await this.assert.shouldBeHidden(this.page.getByText(cardOwner))
  }
}
