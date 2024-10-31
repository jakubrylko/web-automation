import { ApiResponseBody } from 'cypress-plugin-api'
import * as BoilerplateAPI from './Boilerplate.api'
import { getTenantId } from './Boilerplate.helpers.api'

export const newItemShouldBeListed = (
  response: ApiResponseBody,
  { itemName }: ItemName
) => {
  const newItem = response.body.data.allCrudDemoItems.edges.find(
    ({ node }: { node: { name: string } }) => node.name === itemName
  )
  expect(newItem.node.name).to.eql(itemName)
}

export const itemListShouldBeEmpty = () => {
  BoilerplateAPI.getCurrentUser().then((response) => {
    const tenantId = getTenantId(response)

    BoilerplateAPI.getItemList({ tenantId }).then((response) => {
      const itemList = response.body.data.allCrudDemoItems.edges
      expect(itemList).to.be.empty
    })
  })
}

export const assertItemDetails = (
  response: ApiResponseBody,
  { itemId, itemName }: ItemId & ItemName
) => {
  const { id, name } = response.body.data.crudDemoItem
  expect(id).to.eql(itemId)
  expect(name).to.eql(itemName)
}
