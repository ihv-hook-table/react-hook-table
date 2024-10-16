import { FormatOptions, ValueFormatKey } from '../types';
import { isArrayType } from './isArrayType';
import { toArray } from './toArray';

export function getFormatOptions<F extends FormatOptions = FormatOptions>(
  valueIndex: number,
  format?: ValueFormatKey<F> | ValueFormatKey<F>[],
  formatOptions?: F,
) {
  const keys = toArray(format);

  const functionKey =
    format !== undefined && isArrayType(keys) ? keys[valueIndex] : undefined;

  const missingFomatFunction =
    !!functionKey && (!formatOptions || !formatOptions[functionKey]);

  if (missingFomatFunction) {
    throw new Error(
      `[getFormatOptions]: format function for '${String(functionKey)}' is not defined`,
    );
  }

  return functionKey && formatOptions ? formatOptions[functionKey] : undefined;
}
