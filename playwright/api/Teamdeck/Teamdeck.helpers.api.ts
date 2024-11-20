import { APIRequestContext, APIResponse, Page } from '@playwright/test'
import { TeamdeckAPIPage } from './Teamdeck.api'

const { TEAMDECK_URL } = process.env

export class TeamdeckAPIHelpers extends TeamdeckAPIPage {
  constructor(request: APIRequestContext, page?: Page) {
    super(request, page)
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
        domain: TEAMDECK_URL?.removeUrlPrefix(),
        httpOnly: attrs.some((attr) => attr.includes('HttpOnly')),
        secure: attrs.some((attr) => attr.includes('Secure')),
        sameSite: (attrs.find((attr) => attr.includes('SameSite')) || '').split(
          '='
        )[1] as SameSite
      }
    })
  }
}
