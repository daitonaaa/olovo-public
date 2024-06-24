export function requireNotNull<T>(
  value: T | undefined | null,
  message?: string,
): T {
  if (value === undefined || value === null) {
    throw new TypeError(message ?? 'Required value is not defined');
  }
  return value;
}
