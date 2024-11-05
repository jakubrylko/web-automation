import { APIRequestContext, Page } from '@playwright/test'
import { BaseClass } from '../BaseClass.api'

const { TEAMDECK_URL, EMAIL, PASSWORD } = process.env

export class TeamdeckAPIPage extends BaseClass {
  constructor(request: APIRequestContext, page?: Page) {
    super(request, page)
  }

  async login() {
    return await this.request.post(`${TEAMDECK_URL}/api/auth/login`, {
      data: {
        email: EMAIL,
        password: PASSWORD,
        password_repeat: '',
        token: null,
        terms_consent: false,
        marketing_consent: false,
        product_updates_consent: false
      }
    })
  }
}
