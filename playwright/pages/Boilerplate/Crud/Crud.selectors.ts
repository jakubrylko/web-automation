import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class CrudSelectors extends BaseClass {
  readonly item: Locator

  constructor(page: Page) {
    super(page)

    this.item = page.locator('li')
  }
}
