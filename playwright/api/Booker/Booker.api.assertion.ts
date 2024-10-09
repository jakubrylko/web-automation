import { APIRequestContext, APIResponse, expect } from '@playwright/test'
import { BookerAPIPage } from './Booker.api.page'

export class BookerAPIAssertion extends BookerAPIPage {
  constructor(request: APIRequestContext) {
    super(request)
  }

  async assertCreatedBooking(response: APIResponse) {
    const responseJson = await response.json()
    expect(responseJson).toMatchObject({
      bookingid: expect.any(Number),
      booking: expect.any(Object)
    })
  }
}
