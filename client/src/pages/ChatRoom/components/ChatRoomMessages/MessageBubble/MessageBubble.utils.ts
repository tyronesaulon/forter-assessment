export function isQuestion(text?: string | null): boolean {
  return text?.includes('?') ?? false;
}
