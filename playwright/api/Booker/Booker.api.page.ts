import { APIRequestContext } from '@playwright/test'
import { BaseClass } from '../BaseClass.api'

const { BOOKER_URL } = process.env

export class BookerAPIPage extends BaseClass {
  constructor(request: APIRequestContext) {
    super(request)
  }

  async getBookings() {
    return await this.utils.sendGet(`${BOOKER_URL}/booking`)
  }

  async createBooking(data: object) {
    return await this.utils.sendPost(`${BOOKER_URL}/booking`, data)
  }
}
