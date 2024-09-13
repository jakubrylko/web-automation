/// <reference types="Cypress" />

import { NEW_BOOKING_BODY } from '@common/api/body'

describe('Restful Booker API', () => {
  it('Should get bookings list', () => {
    cy.api({
      method: 'GET',
      url: 'https://restful-booker.herokuapp.com/booking',
    }).then((response: { status: number }) => {
      expect(response.status).to.equal(200)
    })
  })

  it('Should create new booking', () => {
    cy.api({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: NEW_BOOKING_BODY,
    }).then((response: { status: number; body: any }) => {
      expect(response.status).to.equal(200)
      cy.log(`Booking id: ${response.body.bookingid}`)
    })
  })
})
