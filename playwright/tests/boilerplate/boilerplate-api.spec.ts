import { faker } from '@faker-js/faker'
import { test } from '@playwright/test'
import { BoilerplateAPIAssertion } from 'playwright/api/Boilerplate/Boilerplate.assertion.api'

const { commerce } = faker

test.describe('Boilerplate GraphQL', () => {
  let BoilerplateAPI: BoilerplateAPIAssertion

  test.beforeEach(async ({ request }) => {
    BoilerplateAPI = new BoilerplateAPIAssertion(request)
    const loginData = await BoilerplateAPI.login()
    BoilerplateAPI.utils.statusShouldBeOk(loginData)
  })

  test.afterAll(async ({ request }) => {
    BoilerplateAPI = new BoilerplateAPIAssertion(request)
    await BoilerplateAPI.login()
    await BoilerplateAPI.deleteAllItems()
    await BoilerplateAPI.itemListShouldBeEmpty()
  })

  test('Should create new item', async () => {
    const currentUser = await BoilerplateAPI.getCurrentUser()
    BoilerplateAPI.utils.statusShouldBeOk(currentUser)

    const itemName = commerce.productName()
    const tenantId = await BoilerplateAPI.getTenantId(currentUser)
    await BoilerplateAPI.createNewItem({ itemName, tenantId })

    const itemList = await BoilerplateAPI.getItemList({ tenantId })
    await BoilerplateAPI.newItemShouldBeListed(itemList, { itemName })
  })

  test('Should edit existing item', async () => {
    const currentUser = await BoilerplateAPI.getCurrentUser()
    BoilerplateAPI.utils.statusShouldBeOk(currentUser)

    let itemName = commerce.productName()
    const tenantId = await BoilerplateAPI.getTenantId(currentUser)
    const newItem = await BoilerplateAPI.createNewItem({ itemName, tenantId })
    const itemId = await BoilerplateAPI.getItemId(newItem)

    itemName = `${itemName} [Edited]`
    await BoilerplateAPI.editItem({ itemId, itemName, tenantId })
    const itemDetails = await BoilerplateAPI.getItemDetails({
      itemId,
      tenantId
    })
    await BoilerplateAPI.assertItemDetails(itemDetails, { itemId, itemName })
  })
})
