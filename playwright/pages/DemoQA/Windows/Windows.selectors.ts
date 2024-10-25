import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class WindowsSelectors extends BaseClass {
  readonly browserWindowsHeader: Locator
  readonly msgWindowButton: Locator
  readonly tabButton: Locator
  readonly windowButton: Locator

  constructor(page: Page) {
    super(page)

    this.browserWindowsHeader = page.locator('h1.text-center')
    this.msgWindowButton = page.locator('#messageWindowButton')
    this.tabButton = page.locator('#tabButton')
    this.windowButton = page.locator('#windowButton')
  }
}
