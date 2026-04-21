import { describe, expect, it } from 'vite-plus/test';

import { getFooterProps } from './getFooterProps';

describe('utils - getFooterProps', () => {
  it('returns footer props from an object footer', () => {
    expect(
      getFooterProps({
        column: {
          accessor: 'name',
          footer: {
            alignment: 'right',
            colSpan: 3,
            value: 'Total',
          },
        },
      }),
    ).toEqual({
      footerAlignment: 'right',
      colSpan: 3,
      value: 'Total',
    });
  });

  it('uses a blank string value for footer=true', () => {
    expect(
      getFooterProps({
        column: {
          accessor: 'name',
          footer: true,
        },
      }),
    ).toEqual({
      footerAlignment: undefined,
      colSpan: 1,
      value: ' ',
    });
  });

  it('uses the primitive footer value when provided', () => {
    expect(
      getFooterProps({
        column: {
          accessor: 'name',
          footer: 'Summary',
        },
      }),
    ).toEqual({
      footerAlignment: undefined,
      colSpan: 1,
      value: 'Summary',
    });
  });

  it('falls back to defaults for missing or falsy footer values', () => {
    expect(
      getFooterProps({
        column: {
          accessor: 'name',
        },
      }),
    ).toEqual({
      footerAlignment: undefined,
      colSpan: 1,
      value: '-',
    });

    expect(
      getFooterProps({
        column: {
          accessor: 'name',
          footer: {
            alignment: 'center',
            value: '',
          },
        },
      }),
    ).toEqual({
      footerAlignment: 'center',
      colSpan: 1,
      value: '-',
    });

    expect(
      getFooterProps({
        column: {
          accessor: 'name',
          footer: {
            alignment: 'center',
            value: null,
          },
        },
      }),
    ).toEqual({
      footerAlignment: 'center',
      colSpan: 1,
      value: '-',
    });
  });

  it('preserves zero values instead of replacing them with the placeholder', () => {
    expect(
      getFooterProps({
        column: {
          accessor: 'name',
          footer: {
            alignment: 'center',
            colSpan: 0,
            value: 0,
          },
        },
      }),
    ).toEqual({
      footerAlignment: 'center',
      colSpan: 1,
      value: 0,
    });
  });
});
