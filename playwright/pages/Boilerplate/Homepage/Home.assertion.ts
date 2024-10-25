import { Page } from '@playwright/test'
import { HomePage } from './Home.page'

export class HomeAssertion extends HomePage {
  constructor(page: Page) {
    super(page)
  }

  async assertToastMessage() {
    await this.assert.shouldBeVisible(this.toast)
    await this.assert.shouldBeHidden(this.toast)
  }
}
