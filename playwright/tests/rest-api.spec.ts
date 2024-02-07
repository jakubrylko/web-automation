import { expect, test } from '@playwright/test'
import { NEW_BOOKING_BODY } from '@common/api/body'

test.describe('Restful Booker API', () => {
  test('Should get bookings list', async ({ request }) => {
    const response = await request.get(
      'https://restful-booker.herokuapp.com/booking'
    )
    expect(response.status()).toEqual(200)
  })

  test('Should create new booking', async ({ request }) => {
    const response = await request.post(
      'https://restful-booker.herokuapp.com/booking',
      { data: NEW_BOOKING_BODY }
    )
    expect(response.status()).toEqual(200)
    const responseJSON = await response.json()
    console.log(`Booking id: ${responseJSON.bookingid}`)
  })
})
