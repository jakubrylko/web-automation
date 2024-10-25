import { Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class HomePage extends BaseClass {
  constructor(page: Page) {
    super(page)
  }

  async clickOnMenuCard(card: string) {
    await this.page.locator('.card', { hasText: card }).click()
  }
}
