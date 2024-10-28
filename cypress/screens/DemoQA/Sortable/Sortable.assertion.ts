import * as Selectors from './Sortable.selectors'

export const tabShouldBeSelected = (tab: SortableTab) => {
  const currentTab = tab === 'List' ? Selectors.listTab() : Selectors.gridTab()
  currentTab.should('have.attr', 'aria-selected', 'true')
}

export const assertList = ({
  firstItem,
  order
}: {
  firstItem: SortableItem
  order: ItemOrder
}) => {
  const initialOrder = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']
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

  Selectors.listItem().each(($element, index) => {
    expect($element.text()).to.equal(updatedOrder[index])
  })
}
