# Client cheat sheet

## Query

```js
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const { data, loading, error } = useQuery(myQuery);
```

## Mutation

```js
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const [mutate] = useMutation(myMutation, {
  variables: {},
  onCompleted: data => {},
  refetchQueries: [{ query: queryToRefetch, variables: {} }],
  awaitRefetchQueries: true,
});
```
