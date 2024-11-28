import { APIRequestContext } from '@playwright/test'
import { BaseClass } from '../BaseClass.api'

const baseUrl = 'https://restful-booker.herokuapp.com'

export class BookerAPIPage extends BaseClass {
  constructor(request: APIRequestContext) {
    super(request)
  }

  async getBookings() {
    return await this.request.get(`${baseUrl}/booking`)
  }

  async createBooking(data: object) {
    return await this.request.post(`${baseUrl}/booking`, data)
  }
}
