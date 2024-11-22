import { Page } from '@playwright/test'
import { HomeSelectors } from './Home.selectors'

export class HomePage extends HomeSelectors {
  constructor(page: Page) {
    super(page)
  }

  async clickOnNavigationItem(item: string) {
    await this.page.locator(`nav >> text=${item}`).click()
  }

  async clickOnMenuTile(item: string) {
    await this.page.locator(`h4 >> text=${item}`).click()
  }

  async clickAllNotifications() {
    const numOfNotifications = await this.notification.count()
    for (let i = 0; i < numOfNotifications; i++) {
      await this.assert.shouldHaveAttribute(this.notification.nth(i), {
        attr: 'data-status',
        value: 'notRead'
      })
      await this.notification.nth(i).locator('button').click()
    }
  }
}
