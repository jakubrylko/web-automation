export const viewport = {
  MacBook: { width: 1536, height: 900 },
  iPad: { width: 810, height: 1080 },
  iPhone: { width: 393, height: 852 }
}

export type DeviceType = keyof typeof viewport
