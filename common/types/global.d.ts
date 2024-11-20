declare global {
  interface String {
    removeChars: (char: string) => string
    removeUrlPrefix: () => string
  }
}

export {}
