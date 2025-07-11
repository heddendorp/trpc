import { describe, it, expect, vi } from 'vitest';
import { QueryClient, skipToken } from '@tanstack/angular-query-experimental';
import { trpcQueryOptions } from '../src/internals/queryOptions';

describe('trpcQueryOptions', () => {
  it('should create query options with input', () => {
    const queryClient = new QueryClient();
    const mockQuery = vi.fn().mockResolvedValue({ data: 'test' });
    const queryKey = [['posts', 'list'], { input: { limit: 10 } }] as const;

    const options = trpcQueryOptions({
      input: { limit: 10 },
      query: mockQuery,
      queryClient,
      path: ['posts', 'list'],
      queryKey,
      opts: {},
    });

    expect(options).toBeDefined();
    expect(options.queryKey).toEqual(queryKey);
    expect(options.queryFn).toBeDefined();
    expect(options.trpc).toBeDefined();
    expect(options.trpc.path).toBe('posts.list');
  });

  it('should handle skip token', () => {
    const queryClient = new QueryClient();
    const mockQuery = vi.fn().mockResolvedValue({ data: 'test' });
    const queryKey = [['posts', 'list']] as const;

    const options = trpcQueryOptions({
      input: skipToken,
      query: mockQuery,
      queryClient,
      path: ['posts', 'list'],
      queryKey,
      opts: {},
    });

    expect(options).toBeDefined();
    expect(options.queryKey).toEqual(queryKey);
    expect(options.queryFn).toBe(skipToken);
  });

  it('should handle abort on destroy option', () => {
    const queryClient = new QueryClient();
    const mockQuery = vi.fn().mockResolvedValue({ data: 'test' });
    const queryKey = [['posts', 'list']] as const;

    const options = trpcQueryOptions({
      input: {},
      query: mockQuery,
      queryClient,
      path: ['posts', 'list'],
      queryKey,
      opts: {
        trpc: {
          abortOnDestroy: true,
        },
      },
    });

    expect(options).toBeDefined();
    expect(options.queryKey).toEqual(queryKey);
    expect(options.queryFn).toBeDefined();
  });
});