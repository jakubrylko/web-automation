import { encodeCursor } from '@common/helpers'
import { newNodeItem, newNotification } from './mock-factories'

const numOfItems = 5
export const allCrudDemoItems = {
  allCrudDemoItems: {
    edges: Array.from({ length: numOfItems }, () => newNodeItem()),
    pageInfo: {
      startCursor: encodeCursor({ index: 0 }),
      endCursor: encodeCursor({ index: numOfItems - 1 }),
      hasPreviousPage: false,
      hasNextPage: false,
      __typename: 'PageInfo'
    },
    __typename: 'CrudDemoItemConnection'
  }
}

const numOfNotifications = 3
export const notificationsList = {
  hasUnreadNotifications: true,
  allNotifications: {
    edges: Array.from({ length: numOfNotifications }, () => newNotification()),
    pageInfo: {
      endCursor: encodeCursor({ index: numOfNotifications - 1 }),
      hasNextPage: false,
      __typename: 'PageInfo'
    },
    __typename: 'NotificationConnection'
  },
  __typename: 'Query'
}
