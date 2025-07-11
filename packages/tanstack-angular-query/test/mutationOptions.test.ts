import { describe, it, expect, vi } from 'vitest';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { trpcMutationOptions } from '../src/internals/mutationOptions';

describe('trpcMutationOptions', () => {
  it('should create mutation options', () => {
    const queryClient = new QueryClient();
    const mockMutate = vi.fn().mockResolvedValue({ data: 'test' });
    const path = ['posts', 'create'];

    const options = trpcMutationOptions({
      mutate: mockMutate,
      queryClient,
      path,
      opts: {},
      overrides: undefined,
    });

    expect(options).toBeDefined();
    expect(options.mutationKey).toEqual([path]);
    expect(options.mutationFn).toBeDefined();
    expect(options.trpc).toBeDefined();
    expect(options.trpc.path).toBe('posts.create');
  });

  it('should handle mutation success override', () => {
    const queryClient = new QueryClient();
    const mockMutate = vi.fn().mockResolvedValue({ data: 'test' });
    const mockOriginalFn = vi.fn();
    const mockOverrideFn = vi.fn();
    const path = ['posts', 'create'];

    const options = trpcMutationOptions({
      mutate: mockMutate,
      queryClient,
      path,
      opts: {
        onSuccess: mockOriginalFn,
      },
      overrides: {
        onSuccess: mockOverrideFn,
      },
    });

    expect(options).toBeDefined();
    expect(options.onSuccess).toBeDefined();
  });

  it('should handle custom mutation options', () => {
    const queryClient = new QueryClient();
    const mockMutate = vi.fn().mockResolvedValue({ data: 'test' });
    const mockOnError = vi.fn();
    const path = ['posts', 'create'];

    const options = trpcMutationOptions({
      mutate: mockMutate,
      queryClient,
      path,
      opts: {
        onError: mockOnError,
        meta: { custom: 'data' },
      },
      overrides: undefined,
    });

    expect(options).toBeDefined();
    expect(options.onError).toBe(mockOnError);
    expect(options.meta).toEqual({ custom: 'data' });
  });
});