import { Locator, Page } from '@playwright/test'
import { BaseClass } from 'playwright/shared/BaseClass'

export class LoginSelectors extends BaseClass {
  readonly email: Locator
  readonly password: Locator
  readonly loginButton: Locator

  constructor(page: Page) {
    super(page)

    this.email = page.locator('input[name="email"]')
    this.password = page.locator('input[name="password"]')
    this.loginButton = page.locator('button[type="submit"]')
  }
}
