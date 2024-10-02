import { newBooking } from '@common/api/booking'

const { env } = Cypress

describe('Restful Booker API', () => {
  it('Should get bookings list', () => {
    cy.api({
      method: 'GET',
      url: `${env('BOOKER_URL')}/booking`
    }).then((response) => {
      expect(response.status).to.equal(200)
    })
  })

  it('Should create new booking', () => {
    cy.api({
      method: 'POST',
      url: `${env('BOOKER_URL')}/booking`,
      body: newBooking
    }).then((response) => {
      expect(response.status).to.equal(200)
      cy.log(`Booking id: ${response.body.bookingid}`)
    })
  })
})
