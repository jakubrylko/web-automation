import { APIRequestContext, APIResponse, expect } from '@playwright/test'
import { BoilerplateAPIHelpers } from './Boilerplate.helpers.api'

export class BoilerplateAPIAssertion extends BoilerplateAPIHelpers {
  constructor(request: APIRequestContext) {
    super(request)
  }

  async newItemShouldBeListed(response: APIResponse, { itemName }: ItemName) {
    const responseJSON = await response.json()
    const newItem = responseJSON.data.allCrudDemoItems.edges.find(
      ({ node }: { node: { name: string } }) => node.name === itemName
    )
    expect(newItem.node.name).toEqual(itemName)
  }

  async itemListShouldBeEmpty() {
    const currentUser = await this.getCurrentUser()
    const tenantId = await this.getTenantId(currentUser)

    const itemListRes = await (await this.getItemList({ tenantId })).json()
    const itemList = itemListRes.data.allCrudDemoItems.edges
    expect(itemList).toEqual([])
  }

  async assertItemDetails(
    response: APIResponse,
    { itemId, itemName }: ItemId & ItemName
  ) {
    const responseJSON = await response.json()
    const { id, name } = responseJSON.data.crudDemoItem
    expect(id).toEqual(itemId)
    expect(name).toEqual(itemName)
  }
}
