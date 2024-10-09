import { Page } from '@playwright/test'
import { LoginSelectors } from './Login.selectors'

export class LoginPage extends LoginSelectors {
  constructor(page: Page) {
    super(page)
  }

  async signIn({ email, password }: { email: string; password: string }) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.signInButton.click()
  }
}
