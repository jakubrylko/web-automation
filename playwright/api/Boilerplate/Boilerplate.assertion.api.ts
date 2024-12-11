import { APIRequestContext, APIResponse, expect, Page } from '@playwright/test'
import { BoilerplateAPIHelpers } from './Boilerplate.helpers.api'

export class BoilerplateAPIAssertion extends BoilerplateAPIHelpers {
  constructor(request: APIRequestContext, page?: Page) {
    super(request, page)
  }

  async newItemShouldBeListed(response: APIResponse, { itemName }: ItemName) {
    const itemList = await response.json()
    const newItem = itemList.data.allCrudDemoItems.edges.find(
      ({ node }: { node: { name: string } }) => node.name === itemName
    )
    expect(newItem.node.name).toEqual(itemName)
  }

  async itemListShouldBeEmpty() {
    const currentUser = await this.getCurrentUser()
    const tenantId = await this.getTenantId(currentUser)

    const itemListData = await (await this.getItemList({ tenantId })).json()
    const itemList = itemListData.data.allCrudDemoItems.edges
    expect(itemList).toEqual([])
  }

  async assertItemDetails(
    response: APIResponse,
    { itemId, itemName }: ItemId & ItemName
  ) {
    const itemDetails = await response.json()
    const { id, name } = itemDetails.data.crudDemoItem
    expect(id).toEqual(itemId)
    expect(name).toEqual(itemName)
  }
}
