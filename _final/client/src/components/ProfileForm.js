import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import RawInput from './Input';
import { updateUserMutation } from '../mutations';
import { userQuery } from '../queries';

const Form = styled.form`
  margin: 16px 0;
`;

const Input = styled(RawInput)`
  margin: 8px 0;
`;

const Actions = styled.div`
  display: flex;
  margin: 8px 0;
`;

const SaveButton = styled(Button).attrs({ primary: true })`
  margin-left: 16px;
`;

const ProfileForm = ({ user, setEditing }) => {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);
  const [photo, setPhoto] = useState(user.photo);

  const reset = () => {
    setDisplayName(user.displayName);
    setBio(user.bio);
    setPhoto(user.photo);
    setEditing(false);
  };

  const [updateUser, { loading: updateUserLoading }] = useMutation(
    updateUserMutation,
    {
      variables: {
        id: user.id,
        displayName,
        bio,
        photo,
        username: user.username,
      },
      onCompleted: () => reset(),
      refetchQueries: [
        { query: userQuery, variables: { username: user.username } },
      ],
      awaitRefetchQueries: true,
    },
  );

  return (
    <Form
      onSubmit={event => {
        event.preventDefault();
        updateUser();
      }}
    >
      <Input
        placeholder="Name"
        value={displayName}
        onChange={event => setDisplayName(event.target.value)}
        big
      />
      <Input
        placeholder="Bio"
        value={bio}
        onChange={event => setBio(event.target.value)}
      />
      <Input
        placeholder="Avatar URL"
        value={photo}
        onChange={event => setPhoto(event.target.value)}
      />
      <Actions>
        <Button type="reset" onClick={() => reset()}>
          Cancel
        </Button>
        <SaveButton
          primary
          disabled={
            updateUserLoading || displayName === '' || !photo.startsWith('http')
          }
        >
          Save
        </SaveButton>
      </Actions>
    </Form>
  );
};

export default ProfileForm;
