import { APIRequestContext, APIResponse, expect } from '@playwright/test'
import { BookerAPIPage } from './Booker.api'

export class BookerAPIAssertion extends BookerAPIPage {
  constructor(request: APIRequestContext) {
    super(request)
  }

  async assertCreatedBooking(response: APIResponse) {
    const responseJSON = await response.json()
    expect(responseJSON).toMatchObject({
      bookingid: expect.any(Number),
      booking: expect.any(Object)
    })
  }
}
