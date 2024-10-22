import * as Selectors from './Modals.selectors'

export const assert = (modal: Modal) => {
  Selectors.modalTitle().shouldHaveText(modal)
  Selectors.modalBody().shouldBeVisible()
  const closeButton =
    modal === 'Small Modal'
      ? Selectors.closeSmallModal()
      : Selectors.closeLargeModal()
  closeButton.shouldBeVisible()
}
