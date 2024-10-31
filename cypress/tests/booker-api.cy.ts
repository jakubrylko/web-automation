import { newBooking } from '@common/test-data'
import * as BookerAPI from 'cypress/api/Booker'
import { statusShouldBeOk } from 'cypress/api/utilities'

describe('Restful Booker API', () => {
  it('Should get bookings list', () => {
    BookerAPI.getBookings().then((response) => {
      statusShouldBeOk(response)
    })
  })

  it('Should create new booking', () => {
    BookerAPI.createBooking(newBooking).then((response) => {
      statusShouldBeOk(response)
      BookerAPI.assertCreatedBooking(response)
    })
  })
})
