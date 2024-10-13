import { APIRequestContext } from '@playwright/test'
import { BaseClass } from '../BaseClass.api'

const baseUrl = process.env.BOOKER_URL

export class BookerAPIPage extends BaseClass {
  constructor(request: APIRequestContext) {
    super(request)
  }

  async getBookings() {
    return await this.utils.sendGet(`${baseUrl}/booking`)
  }

  async createBooking(data: object) {
    return await this.utils.sendPost(`${baseUrl}/booking`, data)
  }
}
