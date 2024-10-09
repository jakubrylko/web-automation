import { faker } from '@faker-js/faker'

export const cardDetails = {
  cardOwner: faker.person.fullName(),
  cardNumber: '4242424242424242',
  cardExpiry: '1030',
  cardCvc: '123'
}
