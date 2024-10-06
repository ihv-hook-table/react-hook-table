import { TableRowType, ValueFormatType } from '../types';
import { isArrayType } from './isArrayType';
import { throwError } from './throwError';
import { toArray } from './toArray';

export function getFormatFunction<F extends TableRowType = TableRowType>(
  valueIndex: number,
  format?: ValueFormatType<F>,
  formatFunctions?: F,
) {
  const keys = toArray(format);

  const functionKey =
    format !== undefined && isArrayType(keys) ? keys[valueIndex] : undefined;

  const missingFomatFunction =
    !!functionKey && (!formatFunctions || !formatFunctions[functionKey]);

  throwError(
    missingFomatFunction,
    `[getFormatFunction]: format function for '${String(functionKey)}' is not defined`,
  );

  return functionKey && formatFunctions
    ? formatFunctions[functionKey]
    : undefined;
}
