import { newBooking } from '@common/test-data'
import { test } from '@playwright/test'
import { BookerAPIAssertion } from 'playwright/api/Booker/Booker.assertion.api'

test.describe('Restful Booker API', () => {
  let BookerAPI: BookerAPIAssertion

  test.beforeEach(async ({ request }) => {
    BookerAPI = new BookerAPIAssertion(request)
  })

  test('Should get bookings list', async () => {
    const response = await BookerAPI.getBookings()
    BookerAPI.utils.statusShouldBeOk(response)
  })

  test('Should create new booking', async () => {
    const response = await BookerAPI.createBooking(newBooking)
    BookerAPI.utils.statusShouldBeOk(response)
    await BookerAPI.assertCreatedBooking(response)
  })
})
