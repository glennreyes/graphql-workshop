import { gql } from 'apollo-boost';

export const UserBasicInfo = gql`
  fragment UserBasicInfo on User {
    id
    username
    displayName
    photo
  }
`;
