# Example Usage

This directory contains example usage of `@trpc/tanstack-angular-query` with Angular.

## Files

- `app.config.ts` - Shows how to configure the application with tRPC and Angular Query
- `posts.component.ts` - Example component using tRPC queries and mutations

## Key Features Demonstrated

1. **Setup**: How to configure providers for tRPC and Angular Query
2. **Queries**: Using `injectQuery` with tRPC query options
3. **Mutations**: Using `injectMutation` with tRPC mutation options
4. **State Management**: Reactive state with Angular signals
5. **Error Handling**: Proper error state management
6. **Loading States**: Handling loading and pending states
7. **Cache Invalidation**: Invalidating queries after mutations

## Usage Patterns

### Query
```typescript
postsQuery = injectQuery(
  this.trpc.proxy.posts.list.queryOptions()
);
```

### Mutation with Success Callback
```typescript
createPostMutation = injectMutation(
  this.trpc.proxy.posts.create.mutationOptions({
    onSuccess: () => {
      // Invalidate related queries
      this.trpc.queryClient.invalidateQueries({
        queryKey: this.trpc.proxy.posts.list.queryKey()
      });
    }
  })
);
```

### Conditional Rendering
```html
@if (postsQuery.isLoading()) {
  <div>Loading...</div>
} @else if (postsQuery.error()) {
  <div>Error: {{ postsQuery.error()?.message }}</div>
} @else {
  <div>{{ postsQuery.data() }}</div>
}
```

This example demonstrates the Angular-specific patterns and lifecycle management that differentiates this implementation from the React version.