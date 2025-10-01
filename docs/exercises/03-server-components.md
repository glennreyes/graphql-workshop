# Exercise 03 · React Server Components & Suspense

This branch starts with queries and mutations solved. Your next challenge is to connect the server-rendered demo so we can showcase React 19 + GraphQL together.

## Objectives

- Fetch GraphQL data inside a Server Component using Apollo's server-side client.
- Stream the result with `Suspense` so React can progressively render the demo.
- Contrast the server-rendered feed with the client-side experience on the main page.

## What to Build

1. **ServerPosts component (`app/components/server-posts.tsx`)**
   - Import `getClient` from `@/lib/apollo-client` and execute the `AllPosts` query server-side.
   - Respect the optional `limit` prop when slicing posts.
   - Render avatars, timestamps, and post content mirroring the finished demo.
   - Include a title and "fetched on server" indicator so attendees see the render time.

2. **Demo page (`app/app/demo/page.tsx`)**
   - Import `Suspense` and the `ServerPosts` component.
   - Wrap `ServerPosts` with `Suspense` and provide a streaming-friendly fallback.
   - Pass `limit={5}` to reuse the list component without overloading the page.
   - Keep the chat + optimistic UI sections intact for later exercises.

3. **Bonus ideas**
   - Try calling `cache.modify` to mark posts as read or sort differently server-side.
   - Log `server-only` hints to observe when the component renders on the server.

## Workflow Checklist

- Keep the GraphQL server running:

  ```sh
  pnpm --filter server dev
  ```

- Regenerate type artifacts if you modify documents:

  ```sh
  pnpm --filter app generate
  ```

- Start the Next.js app:

  ```sh
  pnpm --filter app dev
  ```

- Visit `http://localhost:3000/demo` to validate the server component once wired.

## Helpful Links

- Next.js Server Components: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
- Apollo + Next.js server helpers: https://github.com/apollographql/apollo-client-nextjs#in-rsc-and-ssr
- React Suspense docs: https://react.dev/reference/react/Suspense

Enjoy the server-side detour! Once this is working, you’ll be ready for subscriptions in the next exercise.
