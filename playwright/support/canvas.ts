import { Page } from '@playwright/test'

export const calculateCoordinateX = async (page: Page, coordinate: number) => {
  const box = await page.locator('canvas').boundingBox()
  return box!.x + (coordinate - 42)
}

export const calculateCoordinateY = async (page: Page, coordinate: number) => {
  const box = await page.locator('canvas').boundingBox()
  return box!.y + (coordinate - 220)
}
