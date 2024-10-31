String.prototype.removeChars = function (char: string): string {
  const regexp = new RegExp(char, 'g')
  return this.replace(regexp, ' ')
}

export {}
