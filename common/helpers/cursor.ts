import { Buffer } from 'buffer'

export const encodeCursor = ({ index }: { index: number }) => {
  const cursorKey = `arrayconnection:${index}`
  return Buffer.from(cursorKey).toString('base64')
}
