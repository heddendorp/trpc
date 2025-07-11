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

# `@trpc/server`

> Create tRPC routers and connect them to a server.

## Documentation

Full documentation for `@trpc/server` can be found [here](https://trpc.io/docs/router)

## Installation

```bash
# npm
npm install @trpc/server

# Yarn
yarn add @trpc/server

# pnpm
pnpm add @trpc/server

# Bun
bun add @trpc/server
```

We also recommend installing `zod` to validate procedure inputs.

## Core Concepts

### 1. Initialize tRPC
Start by creating a tRPC instance with `initTRPC`:

```ts
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();
```

### 2. Create Procedures
Build type-safe procedures with input validation:

```ts
import { z } from 'zod';

const publicProcedure = t.procedure;

const greeting = publicProcedure
  .input(z.object({ name: z.string() }))
  .query(({ input }) => `Hello, ${input.name}!`);
```

### 3. Create Routers
Combine procedures into routers:

```ts
const appRouter = t.router({
  greeting,
  // Add more procedures here
});

export type AppRouter = typeof appRouter;
```

### 4. Connect to a Server
Use adapters to connect your router to different server frameworks:

```ts
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const { listen } = createHTTPServer({
  router: appRouter,
});

listen(3000);
```

## Available Adapters

- **Standalone**: `@trpc/server/adapters/standalone`
- **Express**: `@trpc/server/adapters/express`
- **Next.js**: `@trpc/server/adapters/next`
- **Fastify**: `@trpc/server/adapters/fastify`
- **AWS Lambda**: `@trpc/server/adapters/aws-lambda`
- **Fetch API**: `@trpc/server/adapters/fetch`
- **WebSocket**: `@trpc/server/adapters/ws`

## Complete Example

```ts
import { initTRPC } from '@trpc/server';
import {
  CreateHTTPContextOptions,
  createHTTPServer,
} from '@trpc/server/adapters/standalone';
import { z } from 'zod';

// Initialize a context for the server
function createContext(opts: CreateHTTPContextOptions) {
  return {};
}

// Get the context type
type Context = Awaited<ReturnType<typeof createContext>>;

// Initialize tRPC
const t = initTRPC.context<Context>().create();

// Create main router
const appRouter = t.router({
  // Greeting procedure
  greeting: t.procedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(({ input }) => `Hello, ${input.name}!`),
});

// Export the app router type to be imported on the client side
export type AppRouter = typeof appRouter;

// Create HTTP server
const { listen } = createHTTPServer({
  router: appRouter,
  createContext,
});

// Listen on port 2022
listen(2022);
```

## Key Features

- **Type Safety**: Full TypeScript support with end-to-end type safety
- **Input Validation**: Built-in support for validation libraries like Zod
- **Middleware**: Add authentication, logging, and other middleware
- **Context**: Share data across procedures with context
- **Subscriptions**: Real-time updates with WebSocket support
- **Error Handling**: Structured error handling with custom error types
- **Transformers**: Transform data between client and server
- **Batching**: Automatic request batching for better performance
