import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

const { commerce, datatype, date, helpers, person } = faker

const checkinDate = date.soon({ days: 30 })
const checkoutDate = date.soon({ days: 30, refDate: checkinDate })
const randomAdditionalNeed = helpers.arrayElement([
  'Breakfast',
  'Lunch',
  'Dinner',
  'Wi-Fi',
  'Parking'
])

export const newBooking = {
  firstname: person.firstName(),
  lastname: person.lastName(),
  totalprice: commerce.price({ min: 100, max: 1000 }),
  depositpaid: datatype.boolean(),
  bookingdates: {
    checkin: dayjs(checkinDate).format('YYYY-MM-DD'),
    checkout: dayjs(checkoutDate).format('YYYY-MM-DD')
  },
  additionalneeds: randomAdditionalNeed
}
