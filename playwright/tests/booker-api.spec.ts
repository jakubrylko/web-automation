import { newBooking } from '@common/test-data'
import { test } from '@playwright/test'
import { BookerAPIAssertion } from 'playwright/api/Booker/Booker.assertion.api'

test.describe('Restful Booker API', () => {
  let BookerAPI: BookerAPIAssertion

  test.beforeEach(async ({ request }) => {
    BookerAPI = new BookerAPIAssertion(request)
  })

  test('Should get bookings list', async () => {
    const bookings = await BookerAPI.getBookings()
    BookerAPI.utils.statusShouldBeOk(bookings)
  })

  test('Should create new booking', async () => {
    const booking = await BookerAPI.createBooking(newBooking)
    BookerAPI.utils.statusShouldBeOk(booking)
    await BookerAPI.assertCreatedBooking(booking)
  })
})
