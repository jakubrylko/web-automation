import { APIRequestContext, APIResponse } from '@playwright/test'
import { BoilerplateAPIPage } from './Boilerplate.api'

export class BoilerplateAPIHelpers extends BoilerplateAPIPage {
  constructor(request: APIRequestContext) {
    super(request)
  }

  async getTenantId(response: APIResponse, { index = 0 } = {}) {
    const responseJSON = await response.json()
    return responseJSON.data.currentUser.tenants[index].id
  }

  async getItemId(response: APIResponse) {
    const responseJSON = await response.json()
    return responseJSON.data.createCrudDemoItem.crudDemoItemEdge.node.id
  }

  async deleteAllItems() {
    const currentUser = await this.getCurrentUser()
    const tenantId = await this.getTenantId(currentUser)
    const itemList = await (await this.getItemList({ tenantId })).json()
    const itemIds = itemList.data.allCrudDemoItems.edges.map(
      ({ node }: { node: { id: string } }) => node.id
    )

    for (const id of itemIds) {
      await this.deleteItem({ itemId: id, tenantId })
    }
  }
}
