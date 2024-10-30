import { APIRequestContext, APIResponse } from '@playwright/test'
import { BaseClass } from '../BaseClass.api'

const { TEAMDECK_URL, EMAIL, PASSWORD } = process.env

export class TeamdeckAPIPage extends BaseClass {
  constructor(request: APIRequestContext) {
    super(request)
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

  async getCookies(response: APIResponse) {
    const cookies = response.headers()['set-cookie']
    return cookies.split('\n').map((cookie) => {
      const [nameAndValue, ...attrs] = cookie.split(';')
      const [name, value] = nameAndValue.split('=')

      return {
        name,
        value,
        path: (attrs.find((attr) => attr.includes('path')) || '').split('=')[1],
        domain: TEAMDECK_URL!.replace('https://', ''),
        httpOnly: attrs.some((attr) => attr.includes('HttpOnly')),
        secure: attrs.some((attr) => attr.includes('Secure')),
        sameSite: (attrs.find((attr) => attr.includes('SameSite')) || '').split(
          '='
        )[1] as SameSite
      }
    })
  }
}
