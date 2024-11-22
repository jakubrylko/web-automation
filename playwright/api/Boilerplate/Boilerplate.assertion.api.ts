import { APIRequestContext, APIResponse, expect, Page } from '@playwright/test'
import { BoilerplateAPIHelpers } from './Boilerplate.helpers.api'

export class BoilerplateAPIAssertion extends BoilerplateAPIHelpers {
  constructor(request: APIRequestContext, page?: Page) {
    super(request, page)
  }

  async newItemShouldBeListed(response: APIResponse, { itemName }: ItemName) {
    const body = await response.json()
    const newItem = body.data.allCrudDemoItems.edges.find(
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
    const body = await response.json()
    const { id, name } = body.data.crudDemoItem
    expect(id).toEqual(itemId)
    expect(name).toEqual(itemName)
  }
}
