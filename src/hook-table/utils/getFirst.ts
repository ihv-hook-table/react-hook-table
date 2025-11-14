import { isArrayType } from './isArrayType';

export function getFirst<T>(value?: T | T[]): T | undefined {
  if (isArrayType(value)) {
    return value.length > 0 ? value[0] : undefined;
  }
  return value;
}
