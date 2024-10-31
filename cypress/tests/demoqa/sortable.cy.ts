import * as LeftPanel from 'cypress/components/DemoQA/LeftPanel'
import * as Home from 'cypress/screens/DemoQA/Homepage'
import * as Sortable from 'cypress/screens/DemoQA/Sortable'

describe('Sortable', () => {
  beforeEach(() => {
    cy.visit('/')
    Home.clickOnMenuCard('Interactions')
    LeftPanel.clickOnMenuItem('Sortable')
    Sortable.tabShouldBeSelected('List')
  })

  it('Should sort list in ascending order', () => {
    const firstItem = 'Two'

    Sortable.sortListInAscendingOrder({ firstItem })
    Sortable.assertList({ firstItem, order: 'ascending' })
  })

  it('Should sort list in descending order', () => {
    const firstItem = 'Four'

    Sortable.sortListInDescendingOrder({ firstItem })
    Sortable.assertList({ firstItem, order: 'descending' })
  })
})
