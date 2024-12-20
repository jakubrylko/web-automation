import {
  addItemMutation,
  allItemsQuery,
  currentUserQuery,
  deleteItemMutation,
  editItemMutation,
  itemDetailsQuery,
  loginMutation
} from '@common/boilerplate'
import { sendGraphQLRequest } from '../utilities'

const { env } = Cypress
const baseUrl = `${env('SAAS_URL')}/api/graphql/`

export const login = () => {
  return sendGraphQLRequest(baseUrl, 'loginFormMutation', loginMutation, {
    variables: {
      input: { email: env('EMAIL'), password: env('PASSWORD') }
    }
  })
}

export const getCurrentUser = () => {
  return sendGraphQLRequest(
    baseUrl,
    'commonQueryCurrentUserQuery',
    currentUserQuery
  )
}

export const createNewItem = ({ itemName, tenantId }: ItemName & TenantId) => {
  return sendGraphQLRequest(
    baseUrl,
    'addCrudDemoItemMutation',
    addItemMutation,
    {
      variables: { input: { name: itemName, tenantId } }
    }
  )
}

export const editItem = ({
  itemId,
  itemName,
  tenantId
}: ItemId & ItemName & TenantId) => {
  return sendGraphQLRequest(
    baseUrl,
    'editCrudDemoItemContentMutation',
    editItemMutation,
    {
      variables: { input: { id: itemId, name: itemName, tenantId } }
    }
  )
}

export const getItemList = ({ tenantId }: TenantId) => {
  return sendGraphQLRequest(baseUrl, 'crudDemoItemListQuery', allItemsQuery, {
    variables: { first: 10, tenantId }
  })
}

export const getItemDetails = ({ itemId, tenantId }: ItemId & TenantId) => {
  return sendGraphQLRequest(
    baseUrl,
    'crudDemoItemDetailsQuery',
    itemDetailsQuery,
    {
      variables: { id: itemId, tenantId }
    }
  )
}

export const deleteItem = ({ itemId, tenantId }: ItemId & TenantId) => {
  return sendGraphQLRequest(
    baseUrl,
    'crudDemoItemListItemDeleteMutation',
    deleteItemMutation,
    {
      variables: { input: { id: itemId, tenantId } }
    }
  )
}
