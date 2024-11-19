import { WELCOME_MESSAGE } from '@common/test-data'
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

  async assertWelcomeMessage() {
    const welcomeMessage = this.page.getByText(WELCOME_MESSAGE)
    await this.assert.shouldBeVisible(welcomeMessage)
  }
}
