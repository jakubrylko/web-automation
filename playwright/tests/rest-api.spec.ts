import { expect, test } from '@playwright/test'
import { newBooking } from '@common/api/booking'

const { BOOKER_URL } = process.env

test.describe('Restful Booker API', () => {
  test('Should get bookings list', async ({ request }) => {
    const response = await request.get(`${BOOKER_URL}/booking`)
    expect(response.status()).toEqual(200)
  })

  test('Should create new booking', async ({ request }) => {
    const response = await request.post(`${BOOKER_URL}/booking`, {
      data: newBooking
    })
    expect(response.status()).toEqual(200)
    const responseJSON = await response.json()
    console.log(`Booking id: ${responseJSON.bookingid}`)
  })
})
