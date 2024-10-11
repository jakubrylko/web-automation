import { sendGet, sendPost } from '../utilities'

const { env } = Cypress

export const getBookings = () => {
  return sendGet(`${env('BOOKER_URL')}/booking`)
}

export const createBooking = (body: object) => {
  return sendPost(`${env('BOOKER_URL')}/booking`, body)
}
