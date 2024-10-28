import * as Selectors from './Sortable.selectors'

const getItemTexts = () => {
  const textArr: string[] = []
  return Selectors.listItem()
    .each(($element) => {
      textArr.push($element.text())
    })
    .then(() => textArr)
}

export const sortListInAscendingOrder = ({
  firstItem
}: {
  firstItem: SortableItem
}) => {
  getItemTexts().then((textArr) => {
    const firstItemIndex = textArr.indexOf(firstItem)
    for (let i = firstItemIndex; i < textArr.length; i++) {
      Selectors.listItem().last().trigger('mousedown', { which: 1 })
      Selectors.listItem().first().trigger('mousemove').trigger('mouseup')
    }
  })
}

export const sortListInDescendingOrder = ({
  firstItem
}: {
  firstItem: SortableItem
}) => {
  getItemTexts().then((textArr) => {
    const firstItemIndex = textArr.indexOf(firstItem)

    // Splitting the items into two arrays
    const firstHalf = textArr.slice(0, firstItemIndex + 1)
    const secondHalf = textArr.slice(firstItemIndex + 1)

    // Sorting the first half
    for (let i = 0; i < firstItemIndex; i++) {
      Selectors.listItem().eq(firstItemIndex).trigger('mousedown', { which: 1 })
      Selectors.listItem().eq(i).trigger('mousemove').trigger('mouseup')
    }

    // Sorting the second half
    for (let i = 0; i < secondHalf.length - 1; i++) {
      Selectors.listItem().last().trigger('mousedown', { which: 1 })
      Selectors.listItem()
        .eq(firstHalf.length + i)
        .trigger('mousemove')
        .trigger('mouseup')
    }
  })
}
