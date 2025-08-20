import { isValidElement, ReactNode } from 'react';
import { isArrayType } from './isArrayType';
import { isObject } from './isObject';
import { toArray } from './toArray';
import type { ColumnProps, TableRecord } from '../types';

export const getChildrenProps = <T extends TableRecord = TableRecord>(
  columns: ReactNode,
) => {
  const mappedValues = (values: ReactNode[]) =>
    values
      ?.map(child => {
        if (isValidElement(child)) {
          return child.props;
        }
        return null;
      })
      .filter(Boolean) as ColumnProps<T>[];

  if (isArrayType<ReactNode>(columns) || isObject(columns)) {
    return mappedValues(toArray(columns));
  }

  return [];
};
