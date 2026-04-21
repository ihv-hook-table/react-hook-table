import { createElement, type HTMLAttributes } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vite-plus/test';

import { TableOptionsContext } from '../context/options-context/options-context';
import { useCustomComponent } from './use-custom-component';

type ValueProps = HTMLAttributes<HTMLDivElement>;

const CustomValue = ({ title = 'custom value' }: ValueProps) =>
  createElement('span', null, title);

const Probe = ({ title }: ValueProps) => {
  const Component = useCustomComponent<ValueProps>('Value');

  if (!Component) {
    return createElement('span', null, 'missing');
  }

  return createElement(Component, { title });
};

describe('hooks - useCustomComponent', () => {
  it('returns the matching custom component from context', () => {
    const markup = renderToStaticMarkup(
      createElement(
        TableOptionsContext.Provider,
        {
          value: {
            components: {
              Value: CustomValue,
            },
          },
        },
        createElement(Probe, { title: 'formatted value' }),
      ),
    );

    expect(markup).toBe('<span>formatted value</span>');
  });

  it('returns undefined when the component is not configured', () => {
    const markup = renderToStaticMarkup(createElement(Probe));

    expect(markup).toBe('<span>missing</span>');
  });
});
