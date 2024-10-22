export {}

declare global {
  interface String {
    removeChars: (char: string) => string
  }
}
