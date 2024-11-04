import { sendGet, sendPost } from '../utilities'

const baseUrl = Cypress.env('BOOKER_API')

export const getBookings = () => {
  return sendGet(`${baseUrl}/booking`)
}

export const createBooking = (body: object) => {
  return sendPost(`${baseUrl}/booking`, body)
}
