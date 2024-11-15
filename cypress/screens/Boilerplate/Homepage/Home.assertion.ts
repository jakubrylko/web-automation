import * as Selectors from './Home.selectors'

export const assertToastMessage = () => {
  Selectors.toast().shouldBeVisible()
  Selectors.toast().should('not.exist')
}
