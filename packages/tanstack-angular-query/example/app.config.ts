import { ApplicationConfig } from '@angular/core';
import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { httpBatchLink } from '@trpc/client';
import { createTRPCProxyClient } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-angular-query';

// Example router type - in real app this would come from your server
interface AppRouter {
  posts: {
    list: {
      query: () => Promise<{ id: number; title: string; content: string }[]>;
    };
    byId: {
      query: (input: { id: number }) => Promise<{ id: number; title: string; content: string }>;
    };
    create: {
      mutation: (input: { title: string; content: string }) => Promise<{ id: number; title: string; content: string }>;
    };
  };
}

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