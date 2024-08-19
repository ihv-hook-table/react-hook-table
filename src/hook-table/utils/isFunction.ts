import { isUndefined } from './isUndefined';

export const isFunction = (value: unknown) =>
  !isUndefined(value) && typeof value === 'function';
