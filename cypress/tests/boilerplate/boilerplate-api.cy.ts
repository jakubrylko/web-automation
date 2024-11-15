import { faker } from '@faker-js/faker'
import * as BoilerplateAPI from 'cypress/api/Boilerplate'
import { statusShouldBeOk } from 'cypress/api/utilities'

const { commerce } = faker

describe('Boilerplate GraphQL', () => {
  beforeEach(() => {
    BoilerplateAPI.login().then((response) => statusShouldBeOk(response))
  })

  after(() => {
    BoilerplateAPI.login()
    BoilerplateAPI.deleteAllItems()
    BoilerplateAPI.itemListShouldBeEmpty()
  })

  it('Should create new item', () => {
    BoilerplateAPI.getCurrentUser().then((response) => {
      statusShouldBeOk(response)

      const itemName = commerce.productName()
      const tenantId = BoilerplateAPI.getTenantId(response)
      BoilerplateAPI.createNewItem({ itemName, tenantId })

      BoilerplateAPI.getItemList({ tenantId }).then((response) => {
        BoilerplateAPI.newItemShouldBeListed(response, { itemName })
      })
    })
  })

  it('Should edit existing item', () => {
    BoilerplateAPI.getCurrentUser().then((response) => {
      statusShouldBeOk(response)

      let itemName = commerce.productName()
      const tenantId = BoilerplateAPI.getTenantId(response)
      BoilerplateAPI.createNewItem({ itemName, tenantId }).then((response) => {
        const itemId = BoilerplateAPI.getItemId(response)

        itemName = `${itemName} [Edited]`
        BoilerplateAPI.editItem({ itemId, itemName, tenantId })
        BoilerplateAPI.getItemDetails({ itemId, tenantId }).then((response) => {
          BoilerplateAPI.assertItemDetails(response, { itemId, itemName })
        })
      })
    })
  })
})
