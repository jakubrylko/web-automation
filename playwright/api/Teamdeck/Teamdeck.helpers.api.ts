import { APIRequestContext, APIResponse, Page } from '@playwright/test'
import { writeFileSync } from 'fs'
import { join } from 'path'
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

  async writeCookies(response: APIResponse) {
    const cookie = response.headers()['set-cookie']
    const cookiePath = join(__dirname, '../../artifacts/downloads/cookie.txt')
    writeFileSync(cookiePath, cookie.removeChars('\n'))
  }

  async getWallId(response: APIResponse, { index = 0 } = {}) {
    const currentUser = await response.json()
    return currentUser.organizations[index].id
  }

  async getMainUnitId(response: APIResponse) {
    const units = await response.json()
    return units.find(({ name }: { name: string }) => name === 'Main').id
  }

  async deleteAllProjects({ wallId }: WallId) {
    const projectsData = await this.getProjects({ wallId })
    const projects = await projectsData.json()
    const ids = projects.map(({ id }: { id: number }) => id)
    await this.deleteProject({ ids, wallId })
  }

  async deleteAllResources({ wallId }: WallId) {
    const resourcesData = await this.getResources({ wallId })
    const resources = await resourcesData.json()
    for (const resource of resources) {
      if (resource.role !== 'superadmin')
        await this.deleteResource({ wallId, resourceId: resource.id })
    }
  }
}
