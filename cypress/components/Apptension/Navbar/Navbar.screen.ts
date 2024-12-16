import * as Selectors from './Navbar.selectors'

export const clickOnItem = (item: string) => {
  Selectors.navbarItem().contains(item).click()
}
