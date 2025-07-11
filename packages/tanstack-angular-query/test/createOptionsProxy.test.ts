import { describe, it, expect, vi } from 'vitest';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { createTRPCOptionsProxy } from '../src/internals/createOptionsProxy';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

// Mock router type for testing
interface MockRouter {
  posts: {
    list: {
      query: () => Promise<{ id: number; title: string }[]>;
    };
    byId: {
      query: (input: { id: number }) => Promise<{ id: number; title: string }>;
    };
    create: {
      mutation: (input: { title: string }) => Promise<{ id: number; title: string }>;
    };
  };
}

describe('createTRPCOptionsProxy', () => {
  it('should create options proxy with client', () => {
    const queryClient = new QueryClient();
    const trpcClient = createTRPCProxyClient<MockRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
        }),
      ],
    });

    const proxy = createTRPCOptionsProxy({
      client: trpcClient,
      queryClient,
    });

    expect(proxy).toBeDefined();
  });

  it('should create query options', () => {
    const queryClient = new QueryClient();
    const trpcClient = createTRPCProxyClient<MockRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
        }),
      ],
    });

    const proxy = createTRPCOptionsProxy({
      client: trpcClient,
      queryClient,
    });

    const queryOptions = proxy.posts.list.queryOptions();
    expect(queryOptions).toBeDefined();
    expect(queryOptions.queryKey).toBeDefined();
    expect(queryOptions.queryFn).toBeDefined();
  });

  it('should create mutation options', () => {
    const queryClient = new QueryClient();
    const trpcClient = createTRPCProxyClient<MockRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
        }),
      ],
    });

    const proxy = createTRPCOptionsProxy({
      client: trpcClient,
      queryClient,
    });

    const mutationOptions = proxy.posts.create.mutationOptions();
    expect(mutationOptions).toBeDefined();
    expect(mutationOptions.mutationKey).toBeDefined();
    expect(mutationOptions.mutationFn).toBeDefined();
  });
});