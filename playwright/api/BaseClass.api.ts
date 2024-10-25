import { APIRequestContext } from '@playwright/test'
import { Utilities } from './Utilities.api'

export class BaseClass {
  readonly request: APIRequestContext
  readonly utils: Utilities

  constructor(request: APIRequestContext) {
    this.request = request
    this.utils = new Utilities(request)
  }
}
