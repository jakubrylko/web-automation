import { Page } from '@playwright/test'
import { LoginSelectors } from './Login.selectors'

const { TEAMDECK_URL, TEAMDECK_USERNAME, TEAMDECK_PASSWORD } = process.env

export const BASIC_AUTH = {
  httpCredentials: {
    username: TEAMDECK_USERNAME!,
    password: TEAMDECK_PASSWORD!
  }
}
export class LoginPage extends LoginSelectors {
  constructor(page: Page) {
    super(page)
  }

  async open() {
    await this.page.goto(TEAMDECK_URL!)
  }

  async signIn({ email, password }: { email: string; password: string }) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.signInButton.click()
  }
}
