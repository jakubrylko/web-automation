import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class HomeSelectors extends BaseClass {
  readonly canvas: Locator
  readonly organizationList: Locator

  constructor(page: Page) {
    super(page)

    this.canvas = this.page.locator('canvas')
    this.organizationList = this.page.locator('organization-list')
  }
}
