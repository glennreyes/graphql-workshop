# Exercise 01 · Queries & Fragments

Welcome to the first hands-on exercise. This branch (`main`) contains starter code with focused TODO markers.

## Objectives

- Fetch the signed-in user using the `Me` query.
- Load the home feed and profile page with data from GraphQL.
- Refactor repetitive field selections into fragments once the queries are working.

## What to Build

1. **User avatar (`app/components/user-avatar.tsx`)**
   - Import `useSuspenseQuery`, `MeDocument`, and the helper for initials.
   - Run the `Me` query and display the viewer's avatar linked to `/@{username}`.

2. **Home feed (`app/components/home-feed.tsx`)**
   - Fetch the viewer (`Me`) and all posts (`AllPosts`).
   - Pass the results into `<Feed me={...} posts={...} />`.

3. **Profile page (`app/components/profile-page.tsx`)**
   - Use `useSuspenseQuery` for both `Me` and `User` (with variables).
   - Restore the detailed layout using the loaded data.

4. **Fragments (`app/graphql/*.graphql`)**
   - After the queries work, introduce fragments (e.g. `fragment User` / `fragment Post`) to avoid duplication between queries.

## Workflow Checklist

- Edit the relevant `.tsx` and `.graphql` files.
- Keep the GraphQL server running in another terminal:

  ```sh
  pnpm --filter server dev
  ```

- Run the GraphQL code generator whenever documents change (requires the server to be running so the schema can be loaded):

  ```sh
  pnpm --filter app generate
  ```
- Start the dev servers (`pnpm dev`) and verify the UI updates.
- Use TODO markers (`TODO(@exercise-01)`) as breadcrumbs.

## Helpful Links

- Apollo `useSuspenseQuery`: https://www.apollographql.com/docs/react/api/react/hooks/#usesuspensequery
- Fragments guide: https://www.apollographql.com/docs/react/data/fragments
- GraphQL Yoga docs: https://the-guild.dev/graphql/yoga-server
- Schema Explorer: http://localhost:4000/graphql (GraphiQL)

## Troubleshooting

- If TypeScript complains about missing generated types, ensure `pnpm --filter app generate` ran successfully.
- Restart the dev server after adding new GraphQL documents.
- Use the browser devtools Network tab to inspect GraphQL requests and responses.

Happy querying!
