import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class LoginSelectors extends BaseClass {
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly signInButton: Locator

  constructor(page: Page) {
    super(page)

    this.emailInput = this.utils.getByType('email')
    this.passwordInput = this.utils.getByType('password')
    this.signInButton = this.selectors.submitButton
  }
}
