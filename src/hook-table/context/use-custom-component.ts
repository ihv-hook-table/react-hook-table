import { ComponentType, useContext } from 'react';
import { TableFormatContext, TableFormatContextType } from './context';

type TableFormatComponentKeys = keyof NonNullable<
  TableFormatContextType['components']
>;
export const useCustomComponent = <P = object>(
  componentName: TableFormatComponentKeys,
) => {
  const { components } = useContext(TableFormatContext) || {};

  const component = components?.[componentName];

  return component as ComponentType<P>;
};
