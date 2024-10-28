import { expect, Page } from '@playwright/test'
import { SortablePage } from './Sortable.page'

export class SortableAssertion extends SortablePage {
  constructor(page: Page) {
    super(page)
  }

  async tabShouldBeSelected(tab: SortableTab) {
    const currentTab = tab === 'List' ? this.listTab : this.gridTab
    await this.assert.shouldHaveAttribute(currentTab, {
      attr: 'aria-selected',
      value: 'true'
    })
  }

  async assertList({
    firstItem,
    order
  }: {
    firstItem: SortableItem
    order: ItemOrder
  }) {
    const initialOrder = [
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
      'Nine'
    ]

    const firstItemIndex = initialOrder.indexOf(firstItem)
    const updatedOrder =
      order === 'ascending'
        ? [
            firstItem,
            ...initialOrder.slice(firstItemIndex + 1),
            ...initialOrder.slice(0, firstItemIndex)
          ]
        : [
            ...initialOrder.slice(0, firstItemIndex + 1).reverse(),
            ...initialOrder.slice(firstItemIndex + 1).reverse()
          ]

    const numOfItems = await this.gridItem.count()
    for (let i = 0; i < numOfItems; i++) {
      const itemText = await this.gridItem.nth(i).textContent()
      expect(itemText).toEqual(updatedOrder[i])
    }
  }
}
