import { test } from '@playwright/test'
import { newBooking } from 'common'
import { BookerAPIAssertion } from 'playwright/api/Booker/Booker.api.assertion'

test.describe('Restful Booker API', () => {
  let BookerAPI: BookerAPIAssertion

  test.beforeEach(async ({ request }) => {
    BookerAPI = new BookerAPIAssertion(request)
  })

  test('Should get bookings list', async () => {
    const response = await BookerAPI.getBookings()
    BookerAPI.assert.statusShouldBeOk(response)
  })

  test('Should create new booking', async () => {
    const response = await BookerAPI.createBooking(newBooking)
    BookerAPI.assert.statusShouldBeOk(response)
    BookerAPI.assertCreatedBooking(response)
  })
})
