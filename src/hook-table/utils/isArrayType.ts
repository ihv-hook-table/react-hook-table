export const isArrayType = <T>(value: unknown): value is Array<T> =>
  Array.isArray(value);
