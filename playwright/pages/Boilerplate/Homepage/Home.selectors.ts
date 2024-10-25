import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class HomeSelectors extends BaseClass {
  readonly toast: Locator

  constructor(page: Page) {
    super(page)

    this.toast = page.getByTestId('toast-1')
  }
}
