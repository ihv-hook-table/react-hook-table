/* eslint-disable @typescript-eslint/no-unused-vars */

import { ColumnProps, FormatOptions, TableRecord } from '../../../types';

export const Column = <
  T extends TableRecord = TableRecord,
  F extends FormatOptions = FormatOptions,
>(
  _props: ColumnProps<T, F>,
): JSX.Element => {
  return <></>;
};
