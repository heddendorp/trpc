<p align="center">
  <a href="https://trpc.io/"><img src="https://assets.trpc.io/icons/svgs/blue-bg-rounded.svg" alt="tRPC" height="75"/></a>
</p>

<h3 align="center">tRPC</h3>

<p align="center">
  <strong>End-to-end typesafe APIs made easy</strong>
</p>

<p align="center">
  <img src="https://assets.trpc.io/www/v10/v10-dark-landscape.gif" alt="Demo" />
</p>

# `@trpc/client`

> Communicate with a tRPC server on the client side.

## Documentation

Full documentation for `@trpc/client` can be found [here](https://trpc.io/docs/vanilla)

## Installation

```bash
# npm
npm install @trpc/client

# Yarn
yarn add @trpc/client

# pnpm
pnpm add @trpc/client

# Bun
bun add @trpc/client
```

## Core Concepts

### 1. Create a Client
Initialize the tRPC client with your server's router type:

```ts
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server';

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});
```

### 2. Make Queries
Call server procedures with full type safety:

```ts
// Query (GET request)
const result = await trpc.greeting.query({ name: 'world' });
console.log(result); // "Hello, world!"

// Mutation (POST request)
const user = await trpc.createUser.mutate({ 
  name: 'John',
  email: 'john@example.com' 
});
```

### 3. Handle Subscriptions
Subscribe to real-time updates:

```ts
// Subscribe to real-time updates
const subscription = trpc.onUserCreate.subscribe(undefined, {
  onData: (user) => {
    console.log('New user created:', user);
  },
});

// Clean up subscription
subscription.unsubscribe();
```

## Available Links

Links determine how the client communicates with the server:

### HTTP Links
- **httpBatchLink**: Batches multiple requests (recommended for most cases)
- **httpLink**: Sends individual requests
- **httpBatchStreamLink**: Streaming responses for large datasets
- **httpSubscriptionLink**: Server-sent events for subscriptions

### WebSocket Links
- **wsLink**: Real-time bidirectional communication

### Utility Links
- **loggerLink**: Logs requests and responses
- **splitLink**: Route different operations to different links
- **retryLink**: Automatically retry failed requests

## Complete Example

```ts
import { createTRPCClient, httpBatchLink, loggerLink } from '@trpc/client';
// Importing the router type from the server file
import type { AppRouter } from './server';

// Initializing the tRPC client
const trpc = createTRPCClient<AppRouter>({
  links: [
    // Log requests in development
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' ||
        (opts.direction === 'down' && opts.result instanceof Error),
    }),
    
    // Batch HTTP requests
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      
      // Optional: pass custom headers
      headers: () => ({
        authorization: getAuthCookie(),
      }),
    }),
  ],
});

async function main() {
  try {
    // Querying the greeting
    const helloResponse = await trpc.greeting.query({
      name: 'world',
    });
    console.log('helloResponse', helloResponse); // "Hello, world!"

    // Making a mutation
    const user = await trpc.createUser.mutate({
      name: 'John Doe',
      email: 'john@example.com',
    });
    console.log('Created user:', user);
  } catch (error) {
    console.error('Error:', error);
  }
}

function getAuthCookie() {
  // Your auth logic here
  return 'Bearer token';
}

main();
```

## Advanced Usage

### Custom Headers
```ts
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      headers: () => ({
        authorization: getAuthToken(),
      }),
    }),
  ],
});
```

### Error Handling
```ts
import { TRPCClientError } from '@trpc/client';

try {
  await trpc.someQuery.query();
} catch (error) {
  if (error instanceof TRPCClientError) {
    console.log('tRPC Error:', error.message);
    console.log('Error code:', error.data?.code);
  }
}
```

### Request Batching
```ts
// These requests will be automatically batched
const [greeting, user] = await Promise.all([
  trpc.greeting.query({ name: 'Alice' }),
  trpc.getUser.query({ id: 1 }),
]);
```

## Key Features

- **Type Safety**: Full TypeScript support with autocomplete
- **Request Batching**: Automatic batching for better performance
- **Caching**: Built-in request deduplication
- **Error Handling**: Structured error handling with custom error types
- **Subscriptions**: Real-time updates with WebSocket support
- **Transformers**: Transform data between client and server
- **Retry Logic**: Automatic retry on network failures
- **Middleware**: Add custom logic to requests and responses
