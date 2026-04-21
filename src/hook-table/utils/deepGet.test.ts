import { describe, expect, it } from 'vite-plus/test';

import { deepGet } from './deepGet';

describe('utils deepGet', () => {
  it('returns nested values from dot notation paths', () => {
    const value = {
      user: {
        profile: {
          name: 'Ada',
        },
      },
    };

    expect(deepGet(value, 'user.profile.name')).toBe('Ada');
  });

  it('returns nested values from bracket notation paths', () => {
    const value = {
      users: [{ name: 'Ada' }, { name: 'Grace' }],
    };

    expect(deepGet(value, 'users[1].name')).toBe('Grace');
  });

  it('falls back to direct key lookup for literal dotted keys', () => {
    const value = {
      'settings.theme': 'dark',
    };

    expect(deepGet(value, 'settings.theme')).toBe('dark');
  });

  it('returns the default value for missing paths', () => {
    const value = {
      user: {
        profile: {
          name: 'Ada',
        },
      },
    };

    expect(deepGet(value, 'user.profile.email', 'unknown')).toBe('unknown');
  });

  it('returns null when a resolved path contains null', () => {
    const value = {
      user: {
        profile: null,
      },
    };

    expect(deepGet(value, 'user.profile', 'unknown')).toBeNull();
  });

  it('returns the default value when the root value is not an object', () => {
    expect(deepGet('Ada', 'length', 'unknown')).toBe('unknown');
    expect(deepGet(null, 'user.name', 'unknown')).toBe('unknown');
  });

  it('returns the default value when the path is empty', () => {
    expect(deepGet({ user: 'Ada' }, '', 'unknown')).toBe('unknown');
    expect(deepGet({ user: 'Ada' }, undefined, 'unknown')).toBe('unknown');
  });
});
