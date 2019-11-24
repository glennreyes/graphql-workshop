# 8 – Optimistic UI

## Task 1 – Load newly created tweet optimistically

Go to the `pages/Home` component and implement Optimistic UI for the `createTweet` mutation. To do that, You have to edit following options in the `useMutation` hook:

- `optimisticResponse`: Here you want to set the result that should be set before we get the response
- `update`: Here you want to put the optimistic response to the cache

> 💡 Refer to the docs to read about the implementation in detail:
>
> - https://www.apollographql.com/docs/react/performance/optimistic-ui

> 💡 Debug with the Apollo Chrome Extension, Network & Console tab in your Devtools.

## Bonus Task – Load updated profile optimistically

Follow similar steps as above.
