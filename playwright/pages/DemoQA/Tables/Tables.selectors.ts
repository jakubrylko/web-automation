import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/pages/BaseClass'

export class TablesSelectors extends BaseClass {
  readonly deleteButton: Locator

  constructor(page: Page) {
    super(page)

    this.deleteButton = page.locator('[id^=delete-record]')
  }
}
