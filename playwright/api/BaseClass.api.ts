import { APIRequestContext, Page } from '@playwright/test'
import { Utilities } from './Utilities.api'

export class BaseClass {
  readonly request: APIRequestContext
  readonly page?: Page
  readonly utils: Utilities

  constructor(request: APIRequestContext, page?: Page) {
    this.request = request
    this.page = page
    this.utils = new Utilities(request, page)
  }
}
