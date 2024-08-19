import { compact } from './compact';
import { isNullOrUndefined } from './isNullOrUndefined';
import { isObject } from './isObject';
import { isUndefined } from './isUndefined';

export const deepGet = <T>(
  object: T,
  path?: string,
  defaultValue?: unknown,
): unknown => {
  if (!path || !isObject(object)) {
    return defaultValue;
  }

  const result = compact(path.split(/[,[\].]+?/)).reduce(
    (result, key) =>
      isNullOrUndefined(result) ? result : result[key as keyof object],
    object,
  );

  return isUndefined(result) || result === object
    ? isUndefined(object[path as keyof T])
      ? defaultValue
      : object[path as keyof T]
    : result;
};
