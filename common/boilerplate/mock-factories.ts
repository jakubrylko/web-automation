import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

const { commerce, internet, string } = faker

export const newNodeItem = () => {
  return {
    node: {
      id: string.alphanumeric(32),
      name: commerce.productName(),
      __typename: 'CrudDemoItemType'
    },
    __typename: 'CrudDemoItemEdge'
  }
}

export const newNotification = () => {
  return {
    node: {
      id: string.alphanumeric(32),
      data: {
        id: string.alphanumeric(32),
        name: commerce.productName()
      },
      createdAt: dayjs().toISOString(),
      readAt: null,
      type: 'CRUD_ITEM_CREATED',
      issuer: {
        id: string.alphanumeric(7),
        avatar: null,
        email: internet.email(),
        __typename: 'UserType'
      },
      __typename: 'NotificationType'
    },
    __typename: 'NotificationEdge'
  }
}
