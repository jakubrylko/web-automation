import { APIRequestContext, APIResponse } from '@playwright/test'
import { BoilerplateAPIPage } from './Boilerplate.api'

const { SAAS_URL } = process.env

export class BoilerplateAPIHelpers extends BoilerplateAPIPage {
  constructor(request: APIRequestContext) {
    super(request)
  }

  async getTenantId(response: APIResponse, { index = 0 } = {}) {
    const body = await response.json()
    return body.data.currentUser.tenants[index].id
  }

  async getItemId(response: APIResponse) {
    const body = await response.json()
    return body.data.createCrudDemoItem.crudDemoItemEdge.node.id
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
    const body = await response.json()
    const domain = SAAS_URL?.removeHttp()
    return [
      {
        name: 'token',
        value: body.data.tokenAuth.access,
        domain,
        path: '/',
        httpOnly: true,
        secure: true
      },
      {
        name: 'refresh_token',
        value: body.data.tokenAuth.refresh,
        domain,
        path: '/api/auth/token-refresh/',
        httpOnly: true,
        secure: false
      }
    ]
  }
}
