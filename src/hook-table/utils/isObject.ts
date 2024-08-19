import { isDateObject } from './isDateObject';
import { isNullOrUndefined } from './isNullOrUndefined';
import { isObjectType } from './isObjectType';

export const isObject = <T extends object>(value: unknown): value is T =>
  !isNullOrUndefined(value) &&
  !Array.isArray(value) &&
  isObjectType(value) &&
  !isDateObject(value);
