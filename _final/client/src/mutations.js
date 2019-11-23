import { gql } from 'apollo-boost';

export const createTweetMutation = gql`
  mutation createTweet($tweet: String!, $from: String!) {
    createTweet(tweet: $tweet, from: $from) {
      id
      tweet
      createdAt
      from {
        id
        username
        displayName
      }
    }
  }
`;

export const updateUserMutation = gql`
  mutation updateUser(
    $id: ID!
    $bio: String
    $displayName: String
    $photo: String
    $username: String!
  ) {
    updateUser(
      id: $id
      bio: $bio
      displayName: $displayName
      photo: $photo
      username: $username
    ) {
      id
    }
  }
`;
