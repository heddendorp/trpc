// Core client functionality
export * from './createTRPCUntypedClient';
export * from './createTRPCClient';
export * from './getFetch';
export * from './TRPCClientError';
export * from './links';

// Type utilities
export { type TRPCProcedureOptions } from './internals/types';

// Deprecated aliases (will be removed in v12)
export {
  /**
   * @deprecated use `createTRPCClient` instead
   */
  createTRPCClient as createTRPCProxyClient,
  /**
   * @deprecated use `inferRouterClient` instead
   */
  type inferRouterClient as inferRouterProxyClient,
} from './createTRPCClient';
