import {
  addItemMutation,
  allItemsQuery,
  currentUserQuery,
  deleteItemMutation,
  editItemMutation,
  itemDetailsQuery,
  loginMutation
} from '@common/boilerplate'
import { APIRequestContext, Page } from '@playwright/test'
import { BaseClass } from '../BaseClass.api'

const { SAAS_API, EMAIL, PASSWORD } = process.env
const baseUrl = SAAS_API!

export class BoilerplateAPIPage extends BaseClass {
  constructor(request: APIRequestContext, page?: Page) {
    super(request, page)
  }

  async login() {
    return await this.utils.sendGraphQLRequest(
      baseUrl,
      'loginFormMutation',
      loginMutation,
      {
        variables: {
          input: { email: EMAIL!, password: PASSWORD! }
        }
      }
    )
  }

  async getCurrentUser() {
    return await this.utils.sendGraphQLRequest(
      baseUrl,
      'commonQueryCurrentUserQuery',
      currentUserQuery
    )
  }

  async createNewItem({ itemName, tenantId }: ItemName & TenantId) {
    return await this.utils.sendGraphQLRequest(
      baseUrl,
      'addCrudDemoItemMutation',
      addItemMutation,
      {
        variables: { input: { name: itemName, tenantId } }
      }
    )
  }

  async editItem({ itemId, itemName, tenantId }: ItemId & ItemName & TenantId) {
    return await this.utils.sendGraphQLRequest(
      baseUrl,
      'editCrudDemoItemContentMutation',
      editItemMutation,
      {
        variables: { input: { id: itemId, name: itemName, tenantId } }
      }
    )
  }

  async getItemList({ tenantId }: TenantId) {
    return await this.utils.sendGraphQLRequest(
      baseUrl,
      'crudDemoItemListQuery',
      allItemsQuery,
      {
        variables: { first: 10, tenantId }
      }
    )
  }

  async getItemDetails({ itemId, tenantId }: ItemId & TenantId) {
    return await this.utils.sendGraphQLRequest(
      baseUrl,
      'crudDemoItemDetailsQuery',
      itemDetailsQuery,
      {
        variables: { id: itemId, tenantId }
      }
    )
  }

  async deleteItem({ itemId, tenantId }: ItemId & TenantId) {
    return await this.utils.sendGraphQLRequest(
      baseUrl,
      'crudDemoItemListItemDeleteMutation',
      deleteItemMutation,
      {
        variables: { input: { id: itemId, tenantId } }
      }
    )
  }
}
