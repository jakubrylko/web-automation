import {
  APIRequestContext,
  APIResponse,
  expect,
  Page,
  Response
} from '@playwright/test'
import { TeamdeckAPIHelpers } from './Teamdeck.helpers.api'

export class TeamdeckAPIAssertion extends TeamdeckAPIHelpers {
  constructor(request: APIRequestContext, page?: Page) {
    super(request, page)
  }

  async assertItemList(response: Response, { isEmpty = false } = {}) {
    const list = await response.json()
    isEmpty
      ? expect(list.items).toEqual([])
      : expect(list.items).not.toEqual([])
  }

  async assertProperties(project: Record<string, unknown>) {
    const projectProperties = [
      ['id', 'number'],
      ['name', 'string'],
      ['color', 'string'],
      ['archived', 'boolean']
    ]

    for (const [property, type] of projectProperties) {
      expect(project).toHaveProperty(property)
      expect(typeof project[property]).toBe(type)
    }
  }

  async assertProject(response: APIResponse) {
    const project = await response.json()
    await this.assertProperties(project)
  }

  async assertProjectList(response: APIResponse) {
    const projects = await response.json()
    for (const project of projects) {
      await this.assertProperties(project)
    }
  }

  async assertProjectOnTheList({ wallId, projectId }: WallId & ProjectId) {
    const projects = await this.getProjects({ wallId })
    const projectsBody = await projects.json()

    expect(projectsBody).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: projectId })])
    )
  }

  async assertTimeEntryOnTheList({
    wallId,
    timeEntryId
  }: WallId & { timeEntryId: number }) {
    const timeEntries = await this.getTimeEntries({ wallId })
    const timeEntriesBody = await timeEntries.json()

    expect(timeEntriesBody).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: timeEntryId })])
    )
  }
}
