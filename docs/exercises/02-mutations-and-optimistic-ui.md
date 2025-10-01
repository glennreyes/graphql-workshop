# Exercise 02 · Mutations & Optimistic UI

This branch builds on top of the completed query/fragments exercise. Your goal is to bring write operations back to life and polish the experience with cache updates and optimistic responses.

## Objectives

- Wire up `CreatePost`, `DeletePost`, and `UpdateUser` using Apollo `useMutation`.
- Keep the UI immediately responsive with cache updates or optimistic responses.
- Ensure the home feed and profile page stay in sync after writes.

## What to Build

1. **Create post (`app/components/create-post-form.tsx`)**
   - Add the `useMutation` hook for `CreatePost`.
   - Execute the mutation inside `onSubmit`, surface errors, reset the form, and toast feedback.
   - Update the local feed (either via explicit cache updates or `refetchQueries`).
   - Bonus: implement optimistic UI so the post appears instantly.

2. **Delete post (`app/components/delete-post-dialog.tsx`)**
   - Connect the dialog button to the `DeletePost` mutation.
   - Make sure both the global feed and the profile feed remove the post.
   - Consider optimistic deletion so the dialog closes without waiting.

3. **Edit profile (`app/components/edit-profile.tsx`)**
   - Add the `UpdateUser` mutation and reuse the dialog form values as variables.
   - Close the dialog, reset the form, and show feedback on success.
   - Refresh cached `User`/`Me` data (and any derived fragments) so the profile updates in place.

4. **Extra credit**
   - Inspect `app/graphql/likes.graphql` and the `LikeButton` component to see how optimistic updates work for other interactions.
   - Experiment with Apollo cache helpers (`cache.modify`, `cache.updateQuery`) for precise updates instead of refetching.

## Workflow Checklist

- Keep the GraphQL server running while working:

  ```sh
  pnpm --filter server dev
  ```

- Regenerate types whenever documents change:

  ```sh
  pnpm --filter app generate
  ```

- Spin up the web app in another terminal:

  ```sh
  pnpm --filter app dev
  ```

## Helpful Links

- Mutations overview: https://www.apollographql.com/docs/react/data/mutations
- Cache interactions: https://www.apollographql.com/docs/react/caching/cache-interaction
- Optimistic UI patterns: https://www.apollographql.com/docs/react/performance/optimistic-ui
- Toast component (`sonner`): https://sonner.emilkowal.ski/

Good luck! Keep an eye on the cache devtools to confirm your updates behave as expected.
