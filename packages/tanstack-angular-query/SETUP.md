# Angular Query Integration Setup Guide

## Overview

This guide shows how to set up and use the `@trpc/tanstack-angular-query` package in your Angular application.

## Installation

```bash
npm install @trpc/tanstack-angular-query @tanstack/angular-query-experimental
```

## Basic Setup

### 1. Configure Application

In your `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { httpBatchLink } from '@trpc/client';
import { createTRPCProxyClient } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-angular-query';
import type { AppRouter } from './server/api/root';

const queryClient = new QueryClient();

const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
});

const { provideTRPC } = createTRPCContext<AppRouter>();

export const appConfig: ApplicationConfig = {
  providers: [
    provideAngularQuery(queryClient),
    ...provideTRPC({
      trpcClient,
      queryClient,
    }),
  ],
};
```

### 2. Use in Components

```typescript
import { Component, inject } from '@angular/core';
import { injectQuery, injectMutation } from '@tanstack/angular-query-experimental';
import { TRPCService } from '@trpc/tanstack-angular-query';

@Component({
  selector: 'app-example',
  template: `
    @if (postsQuery.isLoading()) {
      <p>Loading...</p>
    } @else if (postsQuery.error()) {
      <p>Error: {{ postsQuery.error()?.message }}</p>
    } @else {
      <div>
        @for (post of postsQuery.data(); track post.id) {
          <div>{{ post.title }}</div>
        }
      </div>
    }
  `,
})
export class ExampleComponent {
  private trpc = inject(TRPCService<AppRouter>);
  
  postsQuery = injectQuery(
    this.trpc.proxy.posts.list.queryOptions()
  );
  
  createPostMutation = injectMutation(
    this.trpc.proxy.posts.create.mutationOptions()
  );
}
```

## Key Features

- **Type Safety**: Full TypeScript support with end-to-end type inference
- **Angular Integration**: Built for Angular's dependency injection and lifecycle
- **Reactive**: Works with Angular's reactive patterns and signals
- **TanStack Query**: Leverages all TanStack Query features (caching, background updates, etc.)

## Differences from React Version

- Uses Angular's `inject()` instead of React hooks
- Uses `injectQuery`/`injectMutation` instead of `useQuery`/`useMutation`
- Service-based architecture with dependency injection
- Angular lifecycle integration for cleanup
- `abortOnDestroy` instead of `abortOnUnmount`

## API Reference

### Query Options
- `queryOptions()` - Generate query options for `injectQuery`
- `queryKey()` - Get the query key for cache operations
- `queryFilter()` - Create query filters for batch operations

### Mutation Options
- `mutationOptions()` - Generate mutation options for `injectMutation`
- `mutationKey()` - Get the mutation key

### Infinite Query Options
- `infiniteQueryOptions()` - Generate infinite query options
- `infiniteQueryKey()` - Get the infinite query key

## Best Practices

1. **Service Injection**: Always inject `TRPCService` in your components
2. **Query Key Usage**: Use query keys for cache invalidation
3. **Error Handling**: Always handle loading and error states
4. **Type Safety**: Define your router types properly for full type inference
5. **Cache Management**: Use `queryClient` for manual cache operations

## Example Use Cases

- **Data Fetching**: Fetch lists and individual records
- **Mutations**: Create, update, delete operations
- **Real-time Updates**: Cache invalidation after mutations
- **Infinite Scrolling**: Paginated data loading
- **Error Recovery**: Retry failed requests
- **Optimistic Updates**: Update UI before server response