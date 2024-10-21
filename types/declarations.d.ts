declare global {
  interface String {
    removeNewlines: () => string
    replaceCommas: (value: string) => string
  }
}

export {}
