export {}

String.prototype.removeNewlines = function (): string {
  return this.replace(/\n/g, ' ')
}

String.prototype.replaceCommas = function (value: string): string {
  return this.replace(/,/g, value)
}
