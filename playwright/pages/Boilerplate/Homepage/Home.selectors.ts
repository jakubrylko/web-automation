import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class HomeSelectors extends BaseClass {
  readonly bellWithDot: Locator
  readonly notificationList: Locator
  readonly notification: Locator
  readonly notificationBell: Locator
  readonly toast: Locator

  constructor(page: Page) {
    super(page)

    this.bellWithDot = page.locator('.lucide-bell-dot')
    this.notificationList = page.getByRole('dialog')
    this.notification = this.notificationList.locator('li')
    this.notificationBell = page.getByTestId('notifications-trigger-testid')
    this.toast = page.getByTestId('toast-1')
  }
}
