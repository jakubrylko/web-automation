import { ApiResponseBody } from 'cypress-plugin-api'

export const assertCreatedBooking = (response: ApiResponseBody) => {
  const { body } = response
  expect(body).to.have.property('bookingid').that.is.a('number')
  expect(body).to.have.property('booking').that.is.an('object')
}
