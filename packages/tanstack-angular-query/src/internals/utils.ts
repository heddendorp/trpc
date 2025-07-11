import type { QueryClient } from '@tanstack/angular-query-experimental';
import type { TRPCRequestOptions } from '@trpc/client';
import type { AnyTRPCProcedure } from '@trpc/server';
import type { TRPCQueryKey, TRPCMutationKey, TRPCQueryOptionsResult } from './types';

/**
 * @internal
 */
export function getQueryKeyInternal(
  path: readonly string[],
  input?: unknown,
  type?: 'infinite' | 'query' | 'any',
): TRPCQueryKey {
  // Construct the query key similar to React implementation
  const queryKey: TRPCQueryKey = [path];
  
  if (input !== undefined || type !== undefined) {
    const opts: { input?: unknown; type?: 'infinite' | 'query' } = {};
    if (input !== undefined) {
      opts.input = input;
    }
    if (type !== undefined && type !== 'any') {
      opts.type = type;
    }
    queryKey.push(opts);
  }
  
  return queryKey;
}

/**
 * @internal
 */
export function getMutationKeyInternal(path: readonly string[]): TRPCMutationKey {
  return [path];
}

/**
 * @internal
 */
export function getClientArgs(
  queryKey: TRPCQueryKey,
  opts?: { trpc?: TRPCRequestOptions },
): [path: string, input?: unknown, requestOptions?: TRPCRequestOptions] {
  const [path, { input } = {}] = queryKey;
  return [path.join('.'), input, opts?.trpc];
}

/**
 * @internal
 */
export function createTRPCOptionsResult(args: { path: readonly string[] }): TRPCQueryOptionsResult['trpc'] {
  return {
    path: args.path.join('.'),
  };
}

/**
 * @internal
 */
export function unwrapLazyArg<T>(arg: T | (() => T)): T {
  return typeof arg === 'function' ? (arg as () => T)() : arg;
}

/**
 * @internal
 */
export async function buildQueryFromAsyncIterable<T>(
  iterable: AsyncIterable<T>,
  queryClient: QueryClient,
  queryKey: TRPCQueryKey,
): Promise<T[]> {
  const results: T[] = [];
  for await (const item of iterable) {
    results.push(item);
  }
  return results;
}