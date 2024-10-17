import { Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class LeftPanelPage extends BaseClass {
  constructor(page: Page) {
    super(page)
  }

  async clickOnMenuItem(item: string) {
    await this.page.locator('.btn', { hasText: item }).click()
  }
}
