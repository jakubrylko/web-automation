import { Page } from '@playwright/test'
import { LoginSelectors } from './Login.selectors'

const { SAAS_URL } = process.env

export class LoginPage extends LoginSelectors {
  constructor(page: Page) {
    super(page)
  }

  async open() {
    await this.page.goto(SAAS_URL!)
  }

  async signIn({ email, password }: { email: string; password: string }) {
    await this.email.fill(email)
    await this.password.fill(password)
    await this.loginButton.click()
  }
}
