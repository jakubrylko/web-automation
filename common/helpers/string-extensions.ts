String.prototype.removeChars = function (char: string) {
  const regexp = new RegExp(char, 'g')
  return this.replace(regexp, ' ')
}

String.prototype.removeHttp = function () {
  return this.replace(/^https?:\/\//, '')
}

export {}
