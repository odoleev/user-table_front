export function firstLetterToUpperCase(
  word: string | undefined
): string | null {
  if (word === undefined) return null;
  return word[0].toUpperCase() + word.slice(1);
}
