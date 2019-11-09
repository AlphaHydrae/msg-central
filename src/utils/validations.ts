export interface RequiredValidation {
  readonly required: boolean;
}

export function isBlank(value: unknown) {
  return typeof value === 'string' && value.match(/^\s*$/) !== null;
}

export function isNotUndefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function isUrlString(value: unknown, protocols: string[]): value is string {
  if (typeof value !== 'string') {
    return false;
  }

  try {
    const url = new URL(value);
    return protocols.includes(url.protocol);
  } catch (err) {
    return false;
  }
}