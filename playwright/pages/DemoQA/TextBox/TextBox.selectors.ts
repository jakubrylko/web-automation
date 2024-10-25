import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class TextBoxSelectors extends BaseClass {
  readonly outputData: Locator

  constructor(page: Page) {
    super(page)

    this.outputData = page.locator('#output >> p')
  }
}
