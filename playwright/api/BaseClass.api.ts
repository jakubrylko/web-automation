import { APIRequestContext, Page } from '@playwright/test'
import { Utilities } from './Utilities.api'

export class BaseClass {
  readonly page?: Page
  readonly request: APIRequestContext
  readonly utils: Utilities

  constructor(request: APIRequestContext, page?: Page) {
    this.page = page
    this.request = request
    this.utils = new Utilities(request, page)
  }
}
