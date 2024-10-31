import { test } from '@playwright/test'
import { LeftPanelPage } from 'playwright/components/DemoQA/LeftPanel/LeftPanel.page'
import { HomePage } from 'playwright/pages/DemoQA/Homepage/Home.page'
import { SortableAssertion } from 'playwright/pages/DemoQA/Sortable/Sortable.assertion'

test.describe('Sortable', () => {
  let Home: HomePage
  let LeftPanel: LeftPanelPage
  let Sortable: SortableAssertion

  test.beforeEach(async ({ page }) => {
    Home = new HomePage(page)
    LeftPanel = new LeftPanelPage(page)
    Sortable = new SortableAssertion(page)

    await page.goto('/')
    await Home.clickOnMenuCard('Interactions')
    await LeftPanel.clickOnMenuItem('Sortable')

    await Sortable.gridTab.click()
    await Sortable.tabShouldBeSelected('Grid')
  })

  test('Should sort grid in ascending order', async () => {
    const firstItem = 'Five'

    await Sortable.sortListInAscendingOrder({ firstItem })
    await Sortable.assertList({ firstItem, order: 'ascending' })
  })

  test('Should sort grid in descending order', async () => {
    const firstItem = 'Seven'

    await Sortable.sortListInDescendingOrder({ firstItem })
    await Sortable.assertList({ firstItem, order: 'descending' })
  })
})
