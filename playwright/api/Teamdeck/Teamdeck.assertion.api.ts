import { APIRequestContext, expect, Page, Response } from '@playwright/test'
import { TeamdeckAPIHelpers } from './Teamdeck.helpers.api'

export class TeamdeckAPIAssertion extends TeamdeckAPIHelpers {
  constructor(request: APIRequestContext, page?: Page) {
    super(request, page)
  }

  async assertItemList(response: Response, { isEmpty = false } = {}) {
    const body = await response.json()
    isEmpty
      ? expect(body.items).toEqual([])
      : expect(body.items).not.toEqual([])
  }
}
