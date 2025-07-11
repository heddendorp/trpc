import { Injectable, InjectionToken, Injector } from '@angular/core';
import type { QueryClient } from '@tanstack/angular-query-experimental';
import type { TRPCClient } from '@trpc/client';
import type { AnyTRPCRouter } from '@trpc/server';
import type { TRPCOptionsProxy } from './createOptionsProxy';
import { createTRPCOptionsProxy } from './createOptionsProxy';

/**
 * Injection token for TRPC client
 */
export const TRPC_CLIENT = new InjectionToken<TRPCClient<any>>('TRPC_CLIENT');

/**
 * Injection token for Query client
 */
export const QUERY_CLIENT = new InjectionToken<QueryClient>('QUERY_CLIENT');

/**
 * Angular service for tRPC integration
 */
@Injectable({
  providedIn: 'root',
})
export class TRPCService<TRouter extends AnyTRPCRouter> {
  private _optionsProxy: TRPCOptionsProxy<TRouter> | null = null;

  constructor(private injector: Injector) {}

  /**
   * Initialize the tRPC service with clients
   */
  init(trpcClient: TRPCClient<TRouter>, queryClient: QueryClient): void {
    this._optionsProxy = createTRPCOptionsProxy({
      client: trpcClient,
      queryClient,
    });
  }

  /**
   * Get the tRPC options proxy
   */
  get proxy(): TRPCOptionsProxy<TRouter> {
    if (!this._optionsProxy) {
      throw new Error('TRPCService not initialized. Call init() first.');
    }
    return this._optionsProxy;
  }

  /**
   * Get the tRPC client
   */
  get client(): TRPCClient<TRouter> {
    const client = this.injector.get(TRPC_CLIENT, null);
    if (!client) {
      throw new Error('TRPC_CLIENT not provided. Make sure to provide it in your module.');
    }
    return client;
  }

  /**
   * Get the query client
   */
  get queryClient(): QueryClient {
    const client = this.injector.get(QUERY_CLIENT, null);
    if (!client) {
      throw new Error('QUERY_CLIENT not provided. Make sure to provide it in your module.');
    }
    return client;
  }
}

/**
 * Factory function to create a typed tRPC service
 */
export function createTRPCService<TRouter extends AnyTRPCRouter>(): {
  TRPCService: typeof TRPCService<TRouter>;
  provideTRPC: (config: {
    trpcClient: TRPCClient<TRouter>;
    queryClient: QueryClient;
  }) => any[];
} {
  return {
    TRPCService: TRPCService<TRouter>,
    provideTRPC: (config: {
      trpcClient: TRPCClient<TRouter>;
      queryClient: QueryClient;
    }) => [
      {
        provide: TRPC_CLIENT,
        useValue: config.trpcClient,
      },
      {
        provide: QUERY_CLIENT,
        useValue: config.queryClient,
      },
      TRPCService,
    ],
  };
}

/**
 * Interface for creating tRPC context result
 */
export interface CreateTRPCContextResult<TRouter extends AnyTRPCRouter> {
  TRPCService: typeof TRPCService<TRouter>;
  provideTRPC: (config: {
    trpcClient: TRPCClient<TRouter>;
    queryClient: QueryClient;
  }) => any[];
}

/**
 * Create a set of type-safe Angular services for tRPC
 *
 * @see https://trpc.io/docs/client/tanstack-angular-query/setup
 */
export function createTRPCContext<
  TRouter extends AnyTRPCRouter,
>(): CreateTRPCContextResult<TRouter> {
  return createTRPCService<TRouter>();
}