import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import {
  MessageCircle as Comment,
  RefreshCw as Retweet,
  Share,
  Trash2 as Trash,
} from 'react-feather';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Avatar from './Avatar';
import Date from './Date';
import { deleteTweetMutation } from '../mutations';
import { allTweetsQuery, userQuery } from '../queries';

const Wrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  display: flex;
  padding: 24px 16px;
  margin: 0 -16px;
  transition: 0.4s;

  &:hover {
    background: #f1f1f1;
  }
`;

const Content = styled.div`
  flex: 1;
  margin-left: 16px;
`;

const DisplayName = styled.span`
  color: #000;
  font-weight: bold;
`;

const Info = styled.div`
  color: #bbb;
`;

const StyledLink = styled(Link)`
  color: inherit;
`;

const Message = styled.div`
  font-size: 20px;
  margin: 16px 0;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 320px;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #bbb;
  margin: 0;
  outline: none;
  padding: 0;

  &:disabled {
    color: #ddd;
  }
`;

const Spacer = styled.div`
  width: 24px;
`;

const Tweet = ({ me, loading, tweet }) => {
  const canDelete = tweet.from.id === me.id;
  const [deleteTweet] = useMutation(deleteTweetMutation, {
    variables: { id: tweet.id },
    refetchQueries: [
      { query: allTweetsQuery },
      {
        query: userQuery,
        variables: { username: tweet.from.username },
      },
    ],
    awaitRefetchQueries: true,
  });

  return (
    <Wrapper>
      <Link to={`/${tweet.from.username}`}>
        <Avatar src={tweet.from.photo} alt={`@${tweet.from.username}`} />
      </Link>
      <Content>
        <Info>
          <StyledLink to={`/${tweet.from.username}`}>
            <DisplayName>{tweet.from.displayName}</DisplayName> @
            {tweet.from.username}
          </StyledLink>{' '}
          • <Date date={tweet.createdAt} />
        </Info>
        <Message>{tweet.tweet}</Message>
        <Actions>
          <Button disabled>
            <Comment />
          </Button>
          <Button disabled>
            <Retweet />
          </Button>
          <Button disabled>
            <Share />
          </Button>
          {canDelete ? (
            <Button
              disabled={loading}
              onClick={() => {
                if (window.confirm('Are you sure?')) {
                  deleteTweet();
                }
              }}
            >
              <Trash />
            </Button>
          ) : (
            <Spacer />
          )}
        </Actions>
      </Content>
    </Wrapper>
  );
};

export default Tweet;
