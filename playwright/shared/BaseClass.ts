import { Page } from '@playwright/test'
import { Selectors } from 'playwright/shared/Selectors'
import { Assertions } from 'playwright/shared/Assertions'
import { Utilities } from 'playwright/shared/Utilities'

export class BaseClass {
  readonly page: Page
  readonly assert: Assertions
  readonly selectors: Selectors
  readonly utils: Utilities

  constructor(page: Page) {
    this.page = page
    this.assert = new Assertions()
    this.selectors = new Selectors(page)
    this.utils = new Utilities(page)
  }
}
