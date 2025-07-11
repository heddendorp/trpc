import type {
  DataTag,
  DefinedInitialDataInfiniteOptions,
  InfiniteQueryFunction,
  QueryClient,
  SkipToken,
  UndefinedInitialDataInfiniteOptions,
  UnusedSkipTokenInfiniteOptions,
} from '@tanstack/angular-query-experimental';
import { infiniteQueryOptions, skipToken } from '@tanstack/angular-query-experimental';
import type { TRPCClientErrorLike, TRPCUntypedClient } from '@trpc/client';
import type {
  coerceAsyncIterableToArray,
  DistributiveOmit,
} from '@trpc/server/unstable-core-do-not-import';
import { isAsyncIterable } from '@trpc/server/unstable-core-do-not-import';
import type {
  ResolverDef,
  TRPCInfiniteData,
  TRPCQueryBaseOptions,
  TRPCQueryKey,
  TRPCQueryOptionsResult,
} from './types';
import {
  buildQueryFromAsyncIterable,
  createTRPCOptionsResult,
  getClientArgs,
  unwrapLazyArg,
} from './utils';

type ReservedOptions = 'queryKey' | 'queryFn' | 'queryHashFn' | 'queryHash';

interface UndefinedTRPCInfiniteQueryOptionsIn<TQueryFnData, TData, TError>
  extends DistributiveOmit<
      UndefinedInitialDataInfiniteOptions<
        coerceAsyncIterableToArray<TQueryFnData>,
        TError,
        coerceAsyncIterableToArray<TData>,
        TRPCQueryKey
      >,
      ReservedOptions
    >,
    TRPCQueryBaseOptions {}

interface UndefinedTRPCInfiniteQueryOptionsOut<TQueryFnData, TOutput, TError>
  extends UndefinedInitialDataInfiniteOptions<
      coerceAsyncIterableToArray<TQueryFnData>,
      TError,
      coerceAsyncIterableToArray<TOutput>,
      TRPCQueryKey
    >,
    TRPCQueryOptionsResult {
  queryKey: DataTag<TRPCQueryKey, TRPCInfiniteData<any, coerceAsyncIterableToArray<TOutput>>, TError>;
}

interface DefinedTRPCInfiniteQueryOptionsIn<TQueryFnData, TData, TError>
  extends DistributiveOmit<
      DefinedInitialDataInfiniteOptions<
        coerceAsyncIterableToArray<NoInfer<TQueryFnData>>,
        TError,
        coerceAsyncIterableToArray<TData>,
        TRPCQueryKey
      >,
      ReservedOptions
    >,
    TRPCQueryBaseOptions {}

interface DefinedTRPCInfiniteQueryOptionsOut<TQueryFnData, TData, TError>
  extends DefinedInitialDataInfiniteOptions<
      coerceAsyncIterableToArray<TQueryFnData>,
      TError,
      coerceAsyncIterableToArray<TData>,
      TRPCQueryKey
    >,
    TRPCQueryOptionsResult {
  queryKey: DataTag<TRPCQueryKey, TRPCInfiniteData<any, coerceAsyncIterableToArray<TData>>, TError>;
}

interface UnusedSkipTokenTRPCInfiniteQueryOptionsIn<TQueryFnData, TData, TError>
  extends DistributiveOmit<
      UnusedSkipTokenInfiniteOptions<
        coerceAsyncIterableToArray<TQueryFnData>,
        TError,
        coerceAsyncIterableToArray<TData>,
        TRPCQueryKey
      >,
      ReservedOptions
    >,
    TRPCQueryBaseOptions {}

interface UnusedSkipTokenTRPCInfiniteQueryOptionsOut<TQueryFnData, TOutput, TError>
  extends UnusedSkipTokenInfiniteOptions<
      coerceAsyncIterableToArray<TQueryFnData>,
      TError,
      coerceAsyncIterableToArray<TOutput>,
      TRPCQueryKey
    >,
    TRPCQueryOptionsResult {
  queryKey: DataTag<TRPCQueryKey, TRPCInfiniteData<any, coerceAsyncIterableToArray<TOutput>>, TError>;
}

export interface TRPCInfiniteQueryOptions<TDef extends ResolverDef> {
  <TQueryFnData extends TDef['output'], TData = TQueryFnData>(
    input: TDef['input'] | SkipToken,
    opts: DefinedTRPCInfiniteQueryOptionsIn<
      TQueryFnData,
      TData,
      TRPCClientErrorLike<{
        transformer: TDef['transformer'];
        errorShape: TDef['errorShape'];
      }>
    >,
  ): DefinedTRPCInfiniteQueryOptionsOut<
    TQueryFnData,
    TData,
    TRPCClientErrorLike<{
      transformer: TDef['transformer'];
      errorShape: TDef['errorShape'];
    }>
  >;
  <TQueryFnData extends TDef['output'], TData = TQueryFnData>(
    input: TDef['input'],
    opts?: UnusedSkipTokenTRPCInfiniteQueryOptionsIn<
      TQueryFnData,
      TData,
      TRPCClientErrorLike<{
        transformer: TDef['transformer'];
        errorShape: TDef['errorShape'];
      }>
    >,
  ): UnusedSkipTokenTRPCInfiniteQueryOptionsOut<
    TQueryFnData,
    TData,
    TRPCClientErrorLike<{
      transformer: TDef['transformer'];
      errorShape: TDef['errorShape'];
    }>
  >;
  <TQueryFnData extends TDef['output'], TData = TQueryFnData>(
    input: TDef['input'] | SkipToken,
    opts?: UndefinedTRPCInfiniteQueryOptionsIn<
      TQueryFnData,
      TData,
      TRPCClientErrorLike<{
        transformer: TDef['transformer'];
        errorShape: TDef['errorShape'];
      }>
    >,
  ): UndefinedTRPCInfiniteQueryOptionsOut<
    TQueryFnData,
    TData,
    TRPCClientErrorLike<{
      transformer: TDef['transformer'];
      errorShape: TDef['errorShape'];
    }>
  >;
}

type AnyTRPCInfiniteQueryOptionsIn =
  | DefinedTRPCInfiniteQueryOptionsIn<unknown, unknown, unknown>
  | UnusedSkipTokenTRPCInfiniteQueryOptionsIn<unknown, unknown, unknown>
  | UndefinedTRPCInfiniteQueryOptionsIn<unknown, unknown, unknown>;

type AnyTRPCInfiniteQueryOptionsOut =
  | DefinedTRPCInfiniteQueryOptionsOut<unknown, unknown, unknown>
  | UnusedSkipTokenTRPCInfiniteQueryOptionsOut<unknown, unknown, unknown>
  | UndefinedTRPCInfiniteQueryOptionsOut<unknown, unknown, unknown>;

/**
 * @internal
 */
export function trpcInfiniteQueryOptions(args: {
  input: unknown;
  query: typeof TRPCUntypedClient.prototype.query;
  queryClient: QueryClient | (() => QueryClient);
  path: readonly string[];
  queryKey: TRPCQueryKey;
  opts: AnyTRPCInfiniteQueryOptionsIn;
}): AnyTRPCInfiniteQueryOptionsOut {
  const { input, query, path, queryKey, opts } = args;
  const queryClient = unwrapLazyArg(args.queryClient);

  const inputIsSkipToken = input === skipToken;

  const queryFn: InfiniteQueryFunction<unknown, TRPCQueryKey> = async (
    queryFnContext,
  ) => {
    const actualInput = {
      ...((typeof input === 'object' && input !== null ? input : {}) as any),
      cursor: queryFnContext.pageParam,
    };

    const actualOpts = {
      ...opts,
      trpc: {
        ...opts?.trpc,
        ...(opts?.trpc?.abortOnDestroy
          ? { signal: queryFnContext.signal }
          : { signal: null }),
      },
    };

    const result = await query(...getClientArgs([path, { input: actualInput }], actualOpts));

    if (isAsyncIterable(result)) {
      return buildQueryFromAsyncIterable(result, queryClient, queryKey);
    }

    return result;
  };

  return Object.assign(
    infiniteQueryOptions({
      ...opts,
      queryKey,
      queryFn: inputIsSkipToken ? skipToken : queryFn,
    }),
    { trpc: createTRPCOptionsResult({ path }) },
  );
}