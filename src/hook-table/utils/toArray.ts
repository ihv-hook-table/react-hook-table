import { isArrayType } from './isArrayType';

export function toArray<T>(value: T | T[]): T[] {
  return isArrayType(value) ? value : [value];
}
