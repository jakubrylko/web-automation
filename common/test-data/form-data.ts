import { faker } from '@faker-js/faker'

const { date, helpers, internet, location, person, string } = faker

const birthdate = date.birthdate({ min: 18, max: 65, mode: 'age' })
const randomGender = helpers.arrayElement(['Male', 'Female', 'Other'])
const randomSubject = helpers.arrayElement([
  'Arts',
  'Chemistry',
  'Computer Science',
  'English',
  'Math',
  'Physics'
])
const randomHobby = helpers.arrayElement(['Sports', 'Reading', 'Music'])

export const formData = {
  firstName: person.firstName(),
  lastName: person.lastName(),
  email: internet.email(),
  mobile: string.numeric(10),
  gender: randomGender,
  dateOfBirth: {
    day: birthdate.getDate().toString(),
    month: birthdate.toLocaleString('default', { month: 'long' }),
    year: birthdate.getFullYear().toString()
  },
  subject: randomSubject,
  hobbies: randomHobby,
  address: `${location.streetAddress()},\n${location.city()},\n${location.country()}`
}
