import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class LinksSelectors extends BaseClass {
  readonly link: Locator

  constructor(page: Page) {
    super(page)

    this.link = page.locator('p > a')
  }
}
