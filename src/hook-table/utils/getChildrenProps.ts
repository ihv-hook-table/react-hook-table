import { isValidElement, ReactNode } from 'react';
import { isArrayType } from './isArrayType';
import { isObject } from './isObject';

export const getChildrenProps = (columns: ReactNode) => {
  const mappedValues = (values: ReactNode[]) =>
    values?.map(child => {
      if (isValidElement(child)) {
        return child.props;
      }
      return null;
    });

  // If multiple columns are passed as children
  if (isArrayType<ReactNode>(columns)) {
    return mappedValues(columns);
  }

  //If a single column is passed as children
  if (isObject(columns)) {
    return mappedValues([columns]);
  }

  return [];
};
