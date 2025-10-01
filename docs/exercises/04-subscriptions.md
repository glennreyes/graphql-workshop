# Exercise 04 · GraphQL Subscriptions & Real-Time Updates

The previous branches solved queries, mutations, and server components. Now it's time to bring live updates to the app using GraphQL subscriptions.

## Objectives

- Restore the WebSocket setup on both the server and client.
- Wire subscription hooks into the UI to reflect real-time data.
- Verify updates by using the `/chat` page in multiple browser tabs.

## What to Build

1. **Server WebSocket setup**
   - Reintroduce the WebSocket server in `server/src/index.ts` using `graphql-ws`.
   - Handle `useServer` lifecycle events and reuse Yoga's envelop context pipeline.
   - Ensure schema validation errors are returned to the client early.

2. **Client subscription link**
   - Add `graphql-ws` dependencies back to the app.
  - Update `app/lib/constants.ts` with `graphqlWsEndpoint`.
   - In `app/components/apollo-wrapper.tsx`, create a `GraphQLWsLink` and split HTTP/subscription traffic.

3. **Chat updates (`app/components/chat.tsx`)**
   - Double-check the `useSubscription` logic and cache updates.
   - Use the `/chat` page as your playground: open two tabs and confirm messages flow in real time.

4. **Extra verification**
   - Open `http://localhost:3000/chat` in two tabs.
   - Send a message from one tab and confirm it appears instantly on the other.
   - Try refreshing one tab to ensure persisted messages load via the query and streaming updates continue.

## Workflow Checklist

- Install required packages:

  ```sh
  pnpm --filter server add graphql-ws ws
  pnpm --filter server add -D @types/ws
  pnpm --filter app add graphql-ws
  ```

- Keep the GraphQL server running (now with WS enabled):

  ```sh
  pnpm --filter server dev
  ```

- Start the Next.js app in another terminal:

  ```sh
  pnpm --filter app dev
  ```

- Navigate to `http://localhost:3000/chat` in two tabs to verify real-time updates (send from one tab, watch the other).

## Helpful Links

- Apollo subscriptions: https://www.apollographql.com/docs/react/data/subscriptions
- GraphQL Yoga WS docs: https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions
- `graphql-ws` client: https://the-guild.dev/graphql/ws

Once you complete this exercise, you’ll have end‑to‑end real-time communication in your workshop app!
