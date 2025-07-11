# @trpc/tanstack-angular-query

<a href="https://trpc.io/docs/client/tanstack-angular-query/setup"><strong>TanStack Angular Query Integration for tRPC</strong></a> • <a href="https://trpc.io/docs"><strong>Read the docs</strong></a>

> ⚠️ **Experimental Package** - This package is currently experimental and depends on `@tanstack/angular-query-experimental`. API may change in future versions.

## Installation

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

### 1. Create tRPC Client

```typescript
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server/router';

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});
```

### 2. Setup Angular Application

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { provideTRPC } from '@trpc/tanstack-angular-query';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTanStackQuery(new QueryClient()),
    provideTRPC(trpcClient),
  ],
};
```

### 3. Use in Components

```typescript
import { Component, inject } from '@angular/core';
import { injectQuery, injectMutation } from '@tanstack/angular-query-experimental';
import { injectTRPC } from '@trpc/tanstack-angular-query';

@Component({
  selector: 'app-user-list',
  template: `
    <div>
      @if (userQuery.isPending()) {
        <p>Loading...</p>
      } @else if (userQuery.isError()) {
        <p>Error: {{ userQuery.error()?.message }}</p>
      } @else {
        <ul>
          @for (user of userQuery.data(); track user.id) {
            <li>{{ user.name }}</li>
          }
        </ul>
      }
      
      <button (click)="createUser()" [disabled]="createUserMutation.isPending()">
        Create User
      </button>
    </div>
  `,
})
export class UserListComponent {
  private trpc = injectTRPC();
  
  userQuery = injectQuery(() => this.trpc.user.list.queryOptions());
  
  createUserMutation = injectMutation(() => 
    this.trpc.user.create.mutationOptions({
      onSuccess: () => {
        // Invalidate and refetch user list
        this.userQuery.refetch();
      },
    })
  );
  
  createUser() {
    this.createUserMutation.mutate({ name: 'New User' });
  }
}
```

## Features

- **Type-safe**: Full type safety with TypeScript
- **Angular-native**: Uses Angular's dependency injection and signals
- **TanStack Query integration**: Leverages TanStack Query's powerful caching and synchronization
- **SSR compatible**: Works with Angular Universal
- **Suspense support**: Compatible with Angular's upcoming Suspense features

## Current Status

This package provides a complete Angular adapter for tRPC with TanStack Query integration. The implementation includes:

- ✅ Angular DI providers (`provideTRPC`, `injectTRPC`, `injectTRPCClient`)
- ✅ Query options proxy with type-safe procedure calls
- ✅ Support for queries, mutations, infinite queries, and subscriptions
- ✅ Angular-specific subscription handling with signals
- ✅ Type-safe key generation and filtering
- ✅ Complete TypeScript type definitions

## Limitations

- Depends on experimental `@tanstack/angular-query-experimental` package
- Some advanced features may require additional testing
- API may change as Angular Query moves out of experimental status

## Documentation

For detailed documentation and examples, visit:
- [tRPC docs](https://trpc.io/docs/client/tanstack-angular-query/setup)
- [TanStack Query Angular docs](https://tanstack.com/query/latest/docs/framework/angular/overview)

## Requirements

- Angular 16+
- TypeScript 5.7+
- @tanstack/angular-query-experimental 5.80.3+

## License

MIT