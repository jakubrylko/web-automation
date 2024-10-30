import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class HomeSelectors extends BaseClass {
  readonly calendar: Locator
  readonly canvas: Locator
  readonly datepicker: Locator
  readonly organizationList: Locator

  constructor(page: Page) {
    super(page)

    this.calendar = this.page.locator('md-calendar-month')
    this.canvas = this.page.locator('canvas')
    this.datepicker = this.page.locator('[aria-label="Date"]')
    this.organizationList = this.page.locator('organization-list')
  }
}
