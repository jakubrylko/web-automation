import {
  newBooking,
  newPerson,
  newProject,
  newTimeEntry
} from '@common/teamdeck'
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

  async getOrganizationUnits({ wallId }: WallId) {
    return await this.request.get(
      `${baseUrl}/walls/${wallId}/organization-units`,
      { headers }
    )
  }

  async createProject({ wallId }: WallId) {
    return await this.request.post(`${baseUrl}/walls/${wallId}/projects`, {
      headers,
      data: newProject()
    })
  }

  async getProject({ wallId, projectId }: WallId & { projectId: string }) {
    return await this.request.get(
      `${baseUrl}/walls/${wallId}/projects/${projectId}`,
      {
        headers
      }
    )
  }

  async getProjects({ wallId }: WallId) {
    return await this.request.get(`${baseUrl}/walls/${wallId}/projects`, {
      headers
    })
  }

  async updateProject({ wallId, projectId }: WallId & { projectId: string }) {
    return await this.request.put(
      `${baseUrl}/walls/${wallId}/projects/${projectId}`,
      {
        headers,
        data: newProject()
      }
    )
  }

  async deleteProject({ ids, wallId }: { ids: number } & WallId) {
    return await this.request.post(
      `${baseUrl}/walls/${wallId}/projects/batch-remove`,
      {
        headers,
        data: { ids }
      }
    )
  }

  async createResource({ unitId, wallId }: UnitId & WallId) {
    return await this.request.post(`${baseUrl}/walls/${wallId}/resources`, {
      headers,
      data: newPerson({ unitId })
    })
  }

  async getResources({ wallId }: WallId) {
    return await this.request.get(`${baseUrl}/walls/${wallId}/resources`, {
      headers
    })
  }

  async deleteResource({ wallId, resourceId }: WallId & ResourceId) {
    return await this.request.delete(
      `${baseUrl}/walls/${wallId}/resources/${resourceId}`,
      {
        headers
      }
    )
  }

  async createBooking({
    wallId,
    projectId,
    resourceId
  }: WallId & ProjectId & ResourceId) {
    return await this.request.post(`${baseUrl}/walls/${wallId}/bookings`, {
      headers,
      data: newBooking({ projectId, resourceId })
    })
  }

  async createTimeEntry({
    wallId,
    projectId,
    resourceId
  }: WallId & ProjectId & ResourceId) {
    return await this.request.post(`${baseUrl}/walls/${wallId}/time-entries`, {
      headers,
      data: newTimeEntry({ projectId, resourceId })
    })
  }

  async getTimeEntries({ wallId }: WallId) {
    return await this.request.get(`${baseUrl}/walls/${wallId}/time-entries`, {
      headers
    })
  }
}
