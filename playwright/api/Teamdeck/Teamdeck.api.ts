import { newProject } from '@common/teamdeck'
import { APIRequestContext, Page } from '@playwright/test'
import { readFileSync } from 'fs'
import { join } from 'path'
import { BaseClass } from '../BaseClass.api'

const { EMAIL, PASSWORD, TEAMDECK_API_KEY, TEAMDECK_URL } = process.env
const cookiePath = join(__dirname, '../../artifacts/downloads/cookie.txt')

const baseUrl = `${TEAMDECK_URL}/api`
const headers = {
  'X-Api-Key': TEAMDECK_API_KEY!,
  Cookie: readFileSync(cookiePath, 'utf-8')
}

export class TeamdeckAPIPage extends BaseClass {
  constructor(request: APIRequestContext, page?: Page) {
    super(request, page)
  }

  async login() {
    return await this.request.post(`${baseUrl}/auth/login`, {
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

  async getCurrentUser() {
    return await this.request.get(`${baseUrl}/auth/me`, { headers })
  }

  async createProject({ wallId }: WallId) {
    return await this.request.post(`${baseUrl}/walls/${wallId}/projects`, {
      headers,
      data: newProject
    })
  }

  async getProjects({ wallId }: WallId) {
    return await this.request.get(`${baseUrl}/walls/${wallId}/projects`, {
      headers
    })
  }
}
