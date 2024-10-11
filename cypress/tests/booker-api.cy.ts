import { newBooking } from 'common'
import { statusShouldBeOk } from 'cypress/api/utilities'
import * as Booker from 'cypress/api/Booker'

describe('Restful Booker API', () => {
  it('Should get bookings list', () => {
    Booker.getBookings().then((response) => {
      statusShouldBeOk(response)
    })
  })

  it('Should create new booking', () => {
    Booker.createBooking(newBooking).then((response) => {
      statusShouldBeOk(response)
      Booker.assertCreatedBooking(response)
    })
  })
})
