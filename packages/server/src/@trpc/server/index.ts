// Core tRPC functionality
export {
  TRPCError,
  /**
   * @deprecated use `experimental_trpcMiddleware` instead
   */
  experimental_standaloneMiddleware,
  experimental_standaloneMiddleware as experimental_trpcMiddleware,
  initTRPC,
} from '../../unstable-core-do-not-import';

// Plugin utilities (for framework integrations and advanced use cases)
export {
  getTRPCErrorFromUnknown,
  transformTRPCResponse,
  createFlatProxy as createTRPCFlatProxy,
  createRecursiveProxy as createTRPCRecursiveProxy,
// Type inference utilities
export {
  type inferProcedureInput,
  type inferProcedureOutput,
  type inferProcedureBuilderResolverOptions,
  type inferRouterError,
  type inferRouterInputs,
  type inferRouterOutputs,
  type inferRouterContext,
  type inferClientTypes as inferTRPCClientTypes,
  type inferTransformedProcedureOutput,
  type inferTransformedSubscriptionOutput,
} from '../../unstable-core-do-not-import';

// Core types  
export {
  type AnyClientTypes as AnyTRPCClientTypes,
  type AnyProcedure as AnyTRPCProcedure,
  type AnyRouter as AnyTRPCRouter,
  type RouterDef as TRPCRouterDef,
  type RouterBuilder as TRPCRouterBuilder,
  type RouterCallerFactory as TRPCRouterCallerFactory,
  type RootConfig as TRPCRootConfig,
  type AnyRootTypes as AnyTRPCRootTypes,
// Middleware types
export {
  type MiddlewareFunction as TRPCMiddlewareFunction,
  type MiddlewareBuilder as TRPCMiddlewareBuilder,
  type AnyMiddlewareFunction as AnyTRPCMiddlewareFunction,
} from '../../unstable-core-do-not-import';

// Procedure types
export {
  type CombinedDataTransformer as TRPCCombinedDataTransformer,
  type ProcedureType as TRPCProcedureType,
  type AnyMutationProcedure as AnyTRPCMutationProcedure,
  type AnyQueryProcedure as AnyTRPCQueryProcedure,
  type AnySubscriptionProcedure as AnyTRPCSubscriptionProcedure,
  type MutationProcedure as TRPCMutationProcedure,
  type QueryProcedure as TRPCQueryProcedure,
  type SubscriptionProcedure as TRPCSubscriptionProcedure,
} from '../../unstable-core-do-not-import';

// Router types
export {
  type RouterRecord as TRPCRouterRecord,
  type MergeRouters as TRPCMergeRouters,
  type BuiltRouter as TRPCBuiltRouter,
// Builder types
export {
  type TRPCBuilder,
  type ProcedureBuilder as TRPCProcedureBuilder,
  type RuntimeConfigOptions as TRPCRuntimeConfigOptions,
  type TRPCRootObject,
  type CreateContextCallback,
} from '../../unstable-core-do-not-import';

// Error handling types
export {
  type ErrorFormatter as TRPCErrorFormatter,
  type TRPCErrorShape,
  type DefaultErrorShape as TRPCDefaultErrorShape,
  type DefaultErrorData as TRPCDefaultErrorData,
  type TRPC_ERROR_CODE_KEY,
  type TRPC_ERROR_CODE_NUMBER,
} from '../../unstable-core-do-not-import';

// Router configuration types
export {
  type DecorateCreateRouterOptions as TRPCDecorateCreateRouterOptions,
  type CreateRouterOptions as TRPCCreateRouterOptions,
  type RouterCaller as TRPCRouterCaller,
// Streaming and advanced features
export {
  StandardSchemaV1Error,
  /**
   * @deprecated use `tracked(id, data)` instead
   */
  sse,
  tracked,
  type TrackedEnvelope,
  isTrackedEnvelope,
  lazy,
  /**
   * @deprecated use {@link lazy} instead
   */
  lazy as experimental_lazy,
  callProcedure as callTRPCProcedure,
} from '../../unstable-core-do-not-import';

// Internal utilities (marked as internal but exposed for advanced use cases)
export {
  /**
   * @internal
   */
  type UnsetMarker as TRPCUnsetMarker,
} from '../../unstable-core-do-not-import';
} from '../../unstable-core-do-not-import';

// Deprecated type aliases (will be removed in v12)
export type {
  /**
   * @deprecated use `AnyTRPCProcedure` instead
   */
  AnyProcedure,
  /**
   * @deprecated use `AnyTRPCRouter` instead
   */
  AnyRouter,
  /**
   * @deprecated use `AnyTRPCMiddlewareFunction` instead
   */
  AnyMiddlewareFunction,
  /**
   * @deprecated use `TRPCCombinedDataTransformer` instead
   */
  CombinedDataTransformer,
  /**
   * @deprecated This is a utility type will be removed in v12
   */
  Dict,
  /**
   * @deprecated This is a utility type will be removed in v12
   */
  DeepPartial,
  /**
   * @deprecated use `TRPCProcedureType` instead
   */
  ProcedureType,
  /**
   * @deprecated use `AnyTRPCMutationProcedure` instead
   */
  AnyMutationProcedure,
  /**
   * @deprecated use `AnyTRPCQueryProcedure` instead
   */
  AnyQueryProcedure,
  /**
   * @deprecated use `AnyTRPCSubscriptionProcedure` instead
   */
  AnySubscriptionProcedure,
} from '../../unstable-core-do-not-import';

// Error handling utilities
export {
  /**
   * @deprecated use `getTRPCErrorShape` instead
   */
  getErrorShape,
  getErrorShape as getTRPCErrorShape,
} from '../../unstable-core-do-not-import';

/**
 * @deprecated
 * Use `Awaited<ReturnType<typeof myFunction>>` instead
 */
export type inferAsyncReturnType<TFunction extends (...args: any[]) => any> =
  Awaited<ReturnType<TFunction>>;
