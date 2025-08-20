import { isArrayType } from './isArrayType';
import { toArray } from './toArray';
import type { FormatOptions, ValueFormatKey } from '../types';

export function getFormatFunction<F extends FormatOptions = FormatOptions>(
  valueIndex: number,
  format?: ValueFormatKey<F> | ValueFormatKey<F>[],
  formatFunctions?: F,
) {
  const keys = toArray(format);

  const functionKey =
    format !== undefined && isArrayType(keys) ? keys[valueIndex] : undefined;

  const missingFomatFunction =
    !!functionKey && (!formatFunctions || !formatFunctions[functionKey]);

  if (missingFomatFunction) {
    throw new Error(
      `[getFormatOptions]: format function for '${String(functionKey)}' is not defined`,
    );
  }

  return functionKey && formatFunctions
    ? formatFunctions[functionKey]
    : undefined;
}
