import { sendGet, sendPost } from '../utilities'

const baseUrl = 'https://restful-booker.herokuapp.com'

export const getBookings = () => {
  return sendGet(`${baseUrl}/booking`)
}

export const createBooking = (body: object) => {
  return sendPost(`${baseUrl}/booking`, body)
}
