import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class AlertsSelectors extends BaseClass {
  readonly alertButton: Locator
  readonly timerAlertButton: Locator

  constructor(page: Page) {
    super(page)

    this.alertButton = page.locator('#alertButton')
    this.timerAlertButton = page.locator('#timerAlertButton')
  }
}
