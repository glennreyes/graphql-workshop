import { gql } from 'apollo-boost';
import { UserBasicInfo } from './fragments';

export const currentUserQuery = gql`
  ${UserBasicInfo}

  query getCurrentUser {
    me {
      ...UserBasicInfo
    }
  }
`;

export const allTweetsQuery = gql`
  ${UserBasicInfo}

  query getAllTweets {
    tweets {
      id
      tweet
      createdAt
      from {
        ...UserBasicInfo
      }
    }
  }
`;

export const userQuery = gql`
  ${UserBasicInfo}

  query getUser($username: String!) {
    user(username: $username) {
      ...UserBasicInfo
      bio
      createdAt
      tweets {
        id
        tweet
        createdAt
        from {
          ...UserBasicInfo
        }
      }
    }
  }
`;
