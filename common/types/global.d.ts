declare global {
  interface String {
    removeChars: (char: string) => string
    removeHttp: () => string
  }
}

export {}
