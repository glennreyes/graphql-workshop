# 5 – Client Queries in React

In the next exercises we will be working in the client. It's a tiny create-react-app that demonstrates a Twitter Lite app.

Although the app is written in React, we will mostly be focus writing code related to GraphQL. We won't write any React specific code.

## Before we start

- Make sure our GraphQL server is running under http://localhost:4000
- Start the client with `yarn start`

## Task 1 – Query for the current user

In `src/queries.js` add following Query:

```js
const currentUserQuery = gql`
  query getCurrentUser {
    # TODO
  }
`;
```

Refer to the `components/App` component to see how it is being consumed by the app.

> 💡 Check for GraphQL request in the Network tab of your Chrome Devtools.

> 💡 Download the Apollo Chrome extension for better debugging.

## Task 2 – Query for all tweets

Add the corresponding query in `src/queries.js`. Refer to the `pages/Home` component to see how it is being consumed by the app.

## Task 3 – Query for logged in user in the profile page

Add the corresponding query in `src/queries.js`. Refer to the `pages/Profile` component to see how it is being consumed by the app.

> 💡 We want to pass username as a variable.
