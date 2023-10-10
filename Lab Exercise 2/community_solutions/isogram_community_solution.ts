export function isIsogram(word: string): boolean {
  word = word.replace(/\s+|\-+/g, '')
  word = word.toLowerCase()
  return Array.from(new Set(word.split(''))).length === word.length
}
