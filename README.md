# GraphQL in Modern React Applications

Welcome to the GraphQL workshop for React developers! ☀️

This workshop is all about using GraphQL in React applications. We'll provide you with a pre-configured setup designed for scalability, focusing on how the client interacts with GraphQL. From there, we'll explore advanced features of GraphQL, such as fragments, mutation cache, optimistic UI, and subscriptions. We'll also touch briefly on how GraphQL fits into the evolving React ecosystem, including emerging patterns with React 19 and Server Components. By the end, participants will have a comprehensive toolkit for crafting scalable, GraphQL-integrated React applications.

## 🔧 Setup

1. Get started by cloning this repo and installing the dependencies:

```sh
git clone https://github.com/glennreyes/graphql-workshop.git
cd graphql-workshop
pnpm install
```

2. Seed the database (run this only once after installing dependencies):

```sh
pnpm --filter server seed
```

3. Start the GraphQL server (Terminal A):

```sh
pnpm --filter server dev
```

4. Generate the GraphQL artifacts (Terminal B — rerun whenever you edit `*.graphql` files`. **Important:** Make sure the GraphQL Explorer is up and running at http://localhost:4000/graphql before running this command, as it needs to fetch the schema from the server.)

```sh
pnpm --filter app generate
```

5. Start the web app (you can keep using Terminal B):

```sh
pnpm --filter app dev
```

6. Open GraphQL Explorer at http://localhost:4000/graphql and the React app at http://localhost:3000.

> Prefer a single command? After running `pnpm --filter app generate` once, you can stop both terminals and use `pnpm dev` to let Turbo start the app and server together. Just remember to rerun `pnpm --filter app generate` whenever you change `*.graphql` files.

> Branch flow
>
> - `finish`: the completed reference solution for the entire workshop.
> - `main`: exercise 01 – focus on queries and fragments. Future exercises live on branches following the same pattern.
> - `exercise/02-mutations-optimistic-ui`: exercise 01 is solved, and new TODOs guide you through mutations & optimistic UI.
> - Look for `TODO(@exercise-XX)` markers to know which files to touch.

📘 Need more guidance? Each branch ships with exercise notes inside [`docs/exercises/`](docs/exercises).
- Exercise 01 starter: [`01-queries-and-fragments.md`](docs/exercises/01-queries-and-fragments.md)
- Exercise 02 starter: [`02-mutations-and-optimistic-ui.md`](docs/exercises/02-mutations-and-optimistic-ui.md)

---

## **Workshop Schedule**

**Time: 9:00 – 13:00 (4h including breaks)**

### **9:00 – 9:15 | Welcome & Setup (15m)**

- Quick intro, workshop goals, what we'll build.
- Verify starter project is running.

### **9:15 – 9:35 | Server & Schema Crash Course (20m)**

- Quick conceptual overview: Queries, Mutations, Subscriptions.
- Schema-first vs. Code-first explained.
- Resolvers & context (at a high level).
- **No live coding — show a pre-made resolver/schema example.**
- Transition immediately: "Let's see this in action with the Explorer."

### **9:35 – 10:25 | GraphQL Explorer & Client Fundamentals (50m)**

- Run queries in GraphQL Explorer (playground).
- How to shape queries + test mutations.
- React client setup with Apollo.
- Fragments & co-location of data.
- Demo: fetch + display data, then refactor with fragments.

#### Exercises

1. 💎 Run queries in the GraphQL Explorer to fetch posts and users
2. 💎 Implement query in [`user-avatar.tsx`](app/components/user-avatar.tsx)
3. 💎 Implement query in [`home-feed.tsx`](app/components/home-feed.tsx)
4. 💎 Implement queries in [`profile-page.tsx`](app/components/profile-page.tsx)
5. 💎 Refactor queries using fragments for better data co-location

> 💡 After creating or updating GraphQL documents during the exercises, run `pnpm --filter app generate` so the typed document nodes stay in sync.

> #### Useful links
>
> - https://github.com/apollographql/apollo-client-nextjs
> - https://www.apollographql.com/docs/react/data/fragments
> - https://www.apollographql.com/docs/react/api/react/hooks/#usesuspensequery

### **10:25 – 10:40 | ☕️ Break (15m)**

### **10:40 – 11:20 | Mutations, Cache & Optimistic UI (40m)**

- Write mutations & inspect results.
- Cache updates.
- Optimistic UI.

#### Exercises

1. 💎 Implement mutation in [`create-post-form.tsx`](app/components/create-post-form.tsx)
2. 💎 Implement mutation in [`delete-post-dialog.tsx`](app/components/delete-post-dialog.tsx)
3. 💎 Implement mutation in [`edit-profile.tsx`](app/components/edit-profile.tsx)
4. 💎 Add cache updates after mutations
5. 💎 Implement optimistic UI for create/delete operations

> #### Useful links
>
> - https://www.apollographql.com/docs/react/data/mutations
> - https://www.apollographql.com/docs/react/caching/cache-interaction
> - https://www.apollographql.com/docs/react/performance/optimistic-ui

### **11:20 – 12:00 | React 19, Server Components & Advanced Patterns (40m)**

- GraphQL with Server components.
- React 19 patterns.
- Advanced techniques: streaming, suspense, error boundaries.
- Group discussion: challenges & trade-offs.

> #### Useful links
>
> - https://github.com/apollographql/apollo-client-nextjs#in-rsc-and-ssr
> - https://nextjs.org/docs/app/getting-started/updating-data

### **12:00 – 12:15 | ☕️ Break (15m)**

### **12:15 – 12:45 | Subscriptions & Real-Time Updates (30m)**

- Subscription setup (server + client).
- Demo: live updates (chat/notifications).

#### Exercises

1. 💎 Explore the subscription setup in the client configuration
2. 💎 Implement real-time post updates using subscriptions
3. 💎 Handle subscription lifecycle (connection, reconnection, errors)

> ⚙️ Before starting these exercises, install the required packages:
>
> ```sh
> pnpm --filter server add graphql-ws ws
> pnpm --filter server add -D @types/ws
> pnpm --filter app add graphql-ws
> ```

> #### Useful links
>
> - https://www.apollographql.com/docs/react/data/subscriptions
> - https://the-guild.dev/graphql/yoga-server/docs/features/subscriptions

### **12:45 – 13:00 | Wrap-Up & Q&A (15m)**

- Recap of flow: Queries → Mutations → Server Components → Subscriptions.
- Share resources & next steps.
- Open Q&A.
