import { Locator, Page } from '@playwright/test'
import { Utilities } from './Utilities'

export class Selectors extends Utilities {
  readonly submitButton: Locator

  constructor(page: Page) {
    super(page)

    this.submitButton = this.getByType('submit')
  }
}
