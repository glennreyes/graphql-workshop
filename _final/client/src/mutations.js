import { gql } from 'apollo-boost';
import { UserBasicInfo } from './fragments';

export const createTweetMutation = gql`
  ${UserBasicInfo}

  mutation createTweet($tweet: String!, $from: String!) {
    createTweet(tweet: $tweet, from: $from) {
      id
      tweet
      createdAt
      from {
        ...UserBasicInfo
      }
    }
  }
`;

export const deleteTweetMutation = gql`
  ${UserBasicInfo}

  mutation deleteTweet($id: ID!) {
    deleteTweet(id: $id) {
      id
      tweet
      createdAt
      from {
        ...UserBasicInfo
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
