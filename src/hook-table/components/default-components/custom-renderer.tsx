import { ComponentType } from 'react';

export const CustomRenderer = <P extends object>({
  Component,
  props,
}: {
  Component: ComponentType<P> | null;
  props: P;
}) => {
  if (!Component) {
    return null;
  }

  return <Component {...props} />;
};
