export interface RequiredValidation {
  readonly required: boolean;
}

export function isBlank(value: unknown) {
  return typeof value === 'string' && value.match(/^\s*$/) !== null;
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