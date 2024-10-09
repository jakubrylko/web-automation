import { APIRequestContext } from '@playwright/test'
import { Assertions } from './Assertions.api'
import { Utilities } from './Utilities.api'

export class BaseClass {
  readonly request: APIRequestContext
  readonly assert: Assertions
  readonly utils: Utilities

  constructor(request: APIRequestContext) {
    this.request = request
    this.assert = new Assertions()
    this.utils = new Utilities(request)
  }
}
