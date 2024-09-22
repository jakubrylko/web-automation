import { Page } from '@playwright/test'

export const getBookingCoordinates = async (page: Page) => {
  const box = await page.locator('canvas').boundingBox()
  return { x: box!.x + 268, y: box!.y + 128 }
}

// x  /  y
// 42 / 220   => canvas 0, 0
// 310 / 348    => 352 / 394    x diff: 42 for booking (column)
// 268 / 128 =>
