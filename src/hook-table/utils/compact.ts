export const compact = <T>(value: T[]) =>
  Array.isArray(value) ? value.filter(Boolean) : [];
