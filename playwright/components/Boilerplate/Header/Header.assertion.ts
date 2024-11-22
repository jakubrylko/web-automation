import { expect, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class HeaderAssertion extends BaseClass {
  constructor(page: Page) {
    super(page)
  }

  async assertHeaderTitle(text: string) {
    await expect(this.page.locator('h3')).toHaveText(text)
  }

  async assertHeaderDescription(text: string) {
    await expect(this.page.locator('h3 + p')).toHaveText(text)
  }
}
