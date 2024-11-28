import { faker } from '@faker-js/faker'
import { metaData, newResource } from './data-factories'

export const emptyItemList = {
  _meta: metaData({ totalCount: 0 }),
  items: [],
  highlighted_items: {
    booking: [],
    timeEntry: []
  },
  milestones: []
}

const numOfResources = faker.number.int({ min: 1, max: 10 })
export const mockedResourceList = {
  ...emptyItemList,
  _meta: metaData({ totalCount: numOfResources }),
  items: Array.from({ length: numOfResources }, () => newResource())
}
