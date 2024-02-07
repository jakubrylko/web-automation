import { expect, test } from '@playwright/test'
import { NEW_BOOKING_BODY } from '@common/api/body'

const BASE_URL = 'https://restful-booker.herokuapp.com'

test.describe('Restful Booker API', () => {
  test('Should get bookings list', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking`)
    expect(response.status()).toEqual(200)
  })

  test('Should create new booking', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      data: NEW_BOOKING_BODY,
    })
    expect(response.status()).toEqual(200)
    const responseJSON = await response.json()
    console.log(`Booking id: ${responseJSON.bookingid}`)
  })
})
