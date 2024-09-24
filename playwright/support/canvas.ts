import { Page } from '@playwright/test'
import { formatDate, parseDate } from 'common/helpers/dates'

const getFirstCanvasDate = () => {
  const today = new Date()
  today.setDate(today.getDate() - 3)

  return formatDate(today)
}

const calculateDateDiff = (dateStr: string) => {
  const firstDate = parseDate(getFirstCanvasDate())
  const secondDate = parseDate(dateStr)
  const diffTime = secondDate.getTime() - firstDate.getTime()

  return Math.round(diffTime / (1000 * 60 * 60 * 24))
}

export const getBookingCoordinates = async (page: Page, dateStr: string) => {
  const box = await page.locator('canvas').boundingBox()
  const dateDiff = calculateDateDiff(dateStr)

  return { x: box!.x + 268 + 40 * dateDiff, y: box!.y + 128 }
}
