import { ApiResponseBody } from 'cypress-plugin-api'
import * as BoilerplateAPI from './Boilerplate.api'

export const getTenantId = (response: ApiResponseBody, { index = 0 } = {}) => {
  return response.body.data.currentUser.tenants[index].id
}

export const getItemId = (response: ApiResponseBody) => {
  return response.body.data.createCrudDemoItem.crudDemoItemEdge.node.id
}

export const deleteAllItems = () => {
  BoilerplateAPI.getCurrentUser().then((response) => {
    const tenantId = getTenantId(response)

    BoilerplateAPI.getItemList({ tenantId }).then((response) => {
      response.body.data.allCrudDemoItems.edges
        .map(({ node }: { node: { id: string } }) => node.id)
        .forEach((id: string) => {
          BoilerplateAPI.deleteItem({ itemId: id, tenantId })
        })
    })
  })
}
