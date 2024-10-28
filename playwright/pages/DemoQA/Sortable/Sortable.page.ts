import { Page } from '@playwright/test'
import { SortableSelectors } from './Sortable.selectors'

export class SortablePage extends SortableSelectors {
  constructor(page: Page) {
    super(page)
  }

  async getItemsText() {
    const textArr: string[] = []
    const numOfItems = await this.gridItem.count()
    for (let i = 0; i < numOfItems; i++) {
      const itemText = await this.gridItem.nth(i).textContent()
      textArr.push(itemText || '')
    }
    return textArr
  }

  async sortListInAscendingOrder({ firstItem }: { firstItem: SortableItem }) {
    const textArr = await this.getItemsText()
    const firstItemIndex = textArr.indexOf(firstItem)

    for (let i = firstItemIndex; i < textArr.length; i++) {
      await this.gridItem.last().dragTo(this.gridItem.first())
    }
  }

  async sortListInDescendingOrder({ firstItem }: { firstItem: SortableItem }) {
    const textArr = await this.getItemsText()
    const firstItemIndex = textArr.indexOf(firstItem)

    // Splitting the items into two arrays
    const firstHalf = textArr.slice(0, firstItemIndex + 1)
    const secondHalf = textArr.slice(firstItemIndex + 1)

    // Sorting the first half
    for (let i = 0; i < firstItemIndex; i++) {
      await this.gridItem.nth(firstItemIndex).dragTo(this.gridItem.nth(i))
    }

    // Sorting the second half
    for (let i = 0; i < secondHalf.length - 1; i++) {
      await this.gridItem
        .last()
        .dragTo(this.gridItem.nth(firstHalf.length + i), {
          targetPosition: { x: 1, y: 1 }
        })
    }
  }
}
