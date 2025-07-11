import type { TRPCClientErrorLike, TRPCUntypedClient } from '@trpc/client';
import type { ResolverDef, TRPCQueryKey } from './types';
import { getClientArgs } from './utils';

export interface TRPCSubscriptionIdleResult {
  status: 'idle';
  data: undefined;
  error: undefined;
}

export interface TRPCSubscriptionPendingResult {
  status: 'pending';
  data: undefined;
  error: undefined;
}

export interface TRPCSubscriptionConnectingResult {
  status: 'connecting';
  data: undefined;
  error: undefined;
}

export interface TRPCSubscriptionErrorResult<TError> {
  status: 'error';
  data: undefined;
  error: TError;
}

export interface TRPCSubscriptionSuccessResult<TData> {
  status: 'success';
  data: TData;
  error: undefined;
}

export type TRPCSubscriptionResult<TData, TError> =
  | TRPCSubscriptionIdleResult
  | TRPCSubscriptionPendingResult
  | TRPCSubscriptionConnectingResult
  | TRPCSubscriptionErrorResult<TError>
  | TRPCSubscriptionSuccessResult<TData>;

export type TRPCSubscriptionStatus = TRPCSubscriptionResult<any, any>['status'];

export interface TRPCSubscriptionOptions<TDef extends ResolverDef> {
  (
    input: TDef['input'],
    opts?: {
      enabled?: boolean;
      onData?: (data: TDef['output']) => void;
      onError?: (error: TRPCClientErrorLike<TDef>) => void;
      onStarted?: () => void;
      onStopped?: () => void;
    },
  ): TRPCSubscriptionResult<
    TDef['output'],
    TRPCClientErrorLike<TDef>
  >;
}

/**
 * @internal
 */
export function trpcSubscriptionOptions<TDef extends ResolverDef>(args: {
  path: readonly string[];
  queryKey: TRPCQueryKey;
  subscribe: typeof TRPCUntypedClient.prototype.subscription;
  opts?: {
    enabled?: boolean;
    onData?: (data: TDef['output']) => void;
    onError?: (error: TRPCClientErrorLike<TDef>) => void;
    onStarted?: () => void;
    onStopped?: () => void;
  };
}): TRPCSubscriptionResult<TDef['output'], TRPCClientErrorLike<TDef>> {
  const { path, queryKey, subscribe, opts } = args;

  // For Angular, we would need to implement the subscription logic using
  // Angular's reactive patterns (RxJS observables)
  // This is a simplified version that matches the interface

  if (opts?.enabled === false) {
    return {
      status: 'idle',
      data: undefined,
      error: undefined,
    };
  }

  // In a real implementation, this would set up an observable subscription
  // and manage the lifecycle with Angular's OnDestroy
  return {
    status: 'pending',
    data: undefined,
    error: undefined,
  };
}

/**
 * Angular service for managing subscriptions (placeholder for actual implementation)
 * In a real implementation, this would be an Angular service that uses RxJS
 */
export interface TRPCSubscriptionService {
  subscribe<TDef extends ResolverDef>(
    input: TDef['input'],
    opts?: {
      enabled?: boolean;
      onData?: (data: TDef['output']) => void;
      onError?: (error: TRPCClientErrorLike<TDef>) => void;
      onStarted?: () => void;
      onStopped?: () => void;
    },
  ): TRPCSubscriptionResult<TDef['output'], TRPCClientErrorLike<TDef>>;
}