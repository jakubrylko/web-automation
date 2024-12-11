import { APIRequestContext, APIResponse, Page } from '@playwright/test'
import { BoilerplateAPIPage } from './Boilerplate.api'

const { SAAS_URL } = process.env

export class BoilerplateAPIHelpers extends BoilerplateAPIPage {
  constructor(request: APIRequestContext, page?: Page) {
    super(request, page)
  }

  async getTenantId(response: APIResponse, { index = 0 } = {}) {
    const currentUser = await response.json()
    return currentUser.data.currentUser.tenants[index].id
  }

  async getItemId(response: APIResponse) {
    const item = await response.json()
    return item.data.createCrudDemoItem.crudDemoItemEdge.node.id
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

  async getCookies(response: APIResponse) {
    const loginData = await response.json()
    const domain = SAAS_URL?.removeUrlPrefix()
    return [
      {
        name: 'token',
        value: loginData.data.tokenAuth.access,
        domain,
        path: '/',
        httpOnly: true,
        secure: false
      },
      {
        name: 'refresh_token',
        value: loginData.data.tokenAuth.refresh,
        domain,
        path: '/api/auth/token-refresh/',
        httpOnly: true,
        secure: false
      }
    ]
  }
}
