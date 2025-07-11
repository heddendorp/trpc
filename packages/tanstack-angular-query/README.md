<p align="center">
  <a href="https://trpc.io/"><img src="https://assets.trpc.io/icons/svgs/blue-bg-rounded.svg" alt="tRPC" height="75"/></a>
</p>

<h3 align="center">tRPC</h3>

<p align="center">
  <strong>End-to-end typesafe APIs made easy</strong>
</p>

# `@trpc/tanstack-angular-query`

> A tRPC wrapper around `@tanstack/angular-query-experimental`.

> [!WARNING]
>
> 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧
> This package is currently in beta as we stabilize the API. We might do breaking changes without respecting semver.

## Documentation

Full documentation can be found at https://trpc.io/docs/client/tanstack-angular-query/setup.

## Installation

> Requires `@tanstack/angular-query-experimental` v5.80.3 or higher

```bash
# npm
npm install @trpc/tanstack-angular-query @tanstack/angular-query-experimental

# Yarn
yarn add @trpc/tanstack-angular-query @tanstack/angular-query-experimental

# pnpm
pnpm add @trpc/tanstack-angular-query @tanstack/angular-query-experimental

# Bun
bun add @trpc/tanstack-angular-query @tanstack/angular-query-experimental
```

## Usage

### Setup

```typescript
// app.config.ts
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
    // other providers...
  ],
};
```

### Using in Components

```typescript
// example.component.ts
import { Component, inject } from '@angular/core';
import { injectQuery, injectMutation } from '@tanstack/angular-query-experimental';
import { TRPCService } from '@trpc/tanstack-angular-query';
import type { AppRouter } from './server/api/root';

@Component({
  selector: 'app-example',
  template: `
    <div>
      @if (postsQuery.isLoading()) {
        <p>Loading posts...</p>
      } @else if (postsQuery.error()) {
        <p>Error: {{ postsQuery.error()?.message }}</p>
      } @else {
        <div>
          @for (post of postsQuery.data(); track post.id) {
            <div>{{ post.title }}</div>
          }
        </div>
      }
      
      <button (click)="createPost()" [disabled]="createPostMutation.isPending()">
        Create Post
      </button>
    </div>
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
  
  createPost() {
    this.createPostMutation.mutate({
      title: 'New Post',
      content: 'This is a new post',
    });
  }
}
```

### Features

- **Type-safe**: Full TypeScript support with inference
- **Angular Query Integration**: Built on top of TanStack Query for Angular
- **Reactive**: Works with Angular's reactive patterns
- **Query Options**: Generate type-safe query options
- **Mutation Options**: Generate type-safe mutation options
- **Infinite Queries**: Support for infinite queries with cursors
- **Subscriptions**: Real-time subscription support (planned)

### Differences from React Version

- Uses Angular's dependency injection instead of React Context
- Uses `injectQuery` and `injectMutation` instead of `useQuery` and `useMutation`
- Service-based architecture instead of hooks
- Angular lifecycle integration for cleanup

## Contributing

We welcome contributions! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

## License

MIT