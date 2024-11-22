import { WELCOME_MESSAGE } from '@common/test-data'
import { expect, Page } from '@playwright/test'
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

  async assertNotificationList({ count }: { count: number }) {
    await this.assert.shouldBeVisible(this.notificationList)
    await expect(this.notification).toHaveCount(count)
  }

  async assertAllNotificationsAreRead() {
    const numOfNotifications = await this.notification.count()
    for (let i = 0; i < numOfNotifications; i++) {
      await this.assert.shouldHaveAttribute(this.notification.nth(i), {
        attr: 'data-status',
        value: 'read'
      })
    }
    await this.assert.shouldBeHidden(this.bellWithDot)
  }
}
