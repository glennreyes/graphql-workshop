import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Input from '../components/Input';
import Loading from '../components/Loading';
import Tweets from '../components/Tweets';
import { createTweetMutation } from '../mutations';
import { allTweetsQuery, userQuery } from '../queries';

const Form = styled.form`
  display: flex;
  margin: 24px 0;
`;

const TweetsSection = ({ loading, me }) => {
  const { data, loading: tweetsLoading, error } = useQuery(allTweetsQuery);
  if (tweetsLoading) return <Loading />;
  if (error) return `Error: ${error.message}`;

  const { tweets } = data;

  return <Tweets loading={loading} me={me} tweets={tweets} />;
};

const Home = ({ loading, me }) => {
  const [tweet, setTweet] = useState('');
  const [createTweet, { loading: createTweetLoading }] = useMutation(
    createTweetMutation,
    {
      variables: { tweet, from: me.username },

      // Reset the tweet composer to its initial state
      onCompleted: () => setTweet(''),

      // Refetch following queries with the given variables once the mutation
      // has been executed.
      refetchQueries: [
        { query: allTweetsQuery },
        { query: userQuery, variables: { username: me.username } },
      ],

      // Wait until the mutation is done before refetching the given queries.
      awaitRefetchQueries: true,
    },
  );

  return (
    <Container>
      <Heading>Home</Heading>
      <Form
        onSubmit={event => {
          event.preventDefault();
          createTweet();
        }}
      >
        <Input
          onChange={event => setTweet(event.target.value)}
          placeholder="What's happening?"
          value={tweet}
        />
        <Button
          primary
          disabled={createTweetLoading || loading || tweet === ''}
        >
          Tweet
        </Button>
      </Form>
      <TweetsSection loading={loading} me={me} />
    </Container>
  );
};

export default Home;
