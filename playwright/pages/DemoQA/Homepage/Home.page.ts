import { Page } from '@playwright/test'
import { BaseClass } from 'playwright/pages/BaseClass'

export class HomePage extends BaseClass {
  constructor(page: Page) {
    super(page)
  }

  async clickOnCard(card: string) {
    await this.page.getByText(card).click()
  }
}
