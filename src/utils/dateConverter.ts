export function dateConverter(date: string): string {
  return new Date(date).toLocaleString();
}
