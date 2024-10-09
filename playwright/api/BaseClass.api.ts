import { APIRequestContext } from '@playwright/test'
import { Assertions } from './Assertions.api'

export class BaseClass {
  readonly request: APIRequestContext
  readonly assert: Assertions

  constructor(request: APIRequestContext) {
    this.request = request
    this.assert = new Assertions()
  }
}
