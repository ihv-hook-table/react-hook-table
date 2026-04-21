import { createElement } from 'react';
import { describe, expect, it } from 'vite-plus/test';

import { getChildrenProps } from './getChildrenProps';

describe('utils - getChildrenProps', () => {
  it('returns props for a single valid React element', () => {
    const child = createElement('div', {
      accessor: 'name',
      header: 'Name',
    });

    expect(getChildrenProps(child)).toEqual([
      {
        accessor: 'name',
        header: 'Name',
      },
    ]);
  });

  it('returns props for valid elements and ignores non-elements in arrays', () => {
    const children = [
      createElement('div', { accessor: 'name', header: 'Name' }),
      null,
      'text',
      createElement('div', { accessor: 'age', header: 'Age' }),
    ];

    expect(getChildrenProps(children)).toEqual([
      {
        accessor: 'name',
        header: 'Name',
      },
      {
        accessor: 'age',
        header: 'Age',
      },
    ]);
  });

  it('returns an empty array for primitive values', () => {
    expect(getChildrenProps('text')).toEqual([]);
    expect(getChildrenProps(1)).toEqual([]);
    expect(getChildrenProps(false)).toEqual([]);
    expect(getChildrenProps(null)).toEqual([]);
    expect(getChildrenProps(undefined)).toEqual([]);
  });

  it('returns an empty array for an empty children array', () => {
    expect(getChildrenProps([])).toEqual([]);
  });
});
