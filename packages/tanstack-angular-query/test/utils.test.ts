import { describe, it, expect } from 'vitest';
import { getQueryKeyInternal, getMutationKeyInternal } from '../src/internals/utils';

describe('utils', () => {
  describe('getQueryKeyInternal', () => {
    it('should create query key with path only', () => {
      const queryKey = getQueryKeyInternal(['posts', 'list']);
      expect(queryKey).toEqual([['posts', 'list']]);
    });

    it('should create query key with input', () => {
      const queryKey = getQueryKeyInternal(['posts', 'byId'], { id: 1 });
      expect(queryKey).toEqual([['posts', 'byId'], { input: { id: 1 } }]);
    });

    it('should create query key with type', () => {
      const queryKey = getQueryKeyInternal(['posts', 'list'], undefined, 'query');
      expect(queryKey).toEqual([['posts', 'list'], { type: 'query' }]);
    });

    it('should create query key with input and type', () => {
      const queryKey = getQueryKeyInternal(['posts', 'list'], { limit: 10 }, 'infinite');
      expect(queryKey).toEqual([['posts', 'list'], { input: { limit: 10 }, type: 'infinite' }]);
    });
  });

  describe('getMutationKeyInternal', () => {
    it('should create mutation key', () => {
      const mutationKey = getMutationKeyInternal(['posts', 'create']);
      expect(mutationKey).toEqual([['posts', 'create']]);
    });
  });
});