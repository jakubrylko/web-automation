import { Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class LeftPanelPage extends BaseClass {
  constructor(page: Page) {
    super(page)
  }

  async clickOnMenuItem(item: string, { exact = false } = {}) {
    await this.page.getByText(item, { exact }).click()
  }
}
