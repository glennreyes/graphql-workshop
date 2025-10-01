'use client';

import type { DeletePostMutation, DeletePostMutationVariables } from '@/graphql/generated/graphql';
import { AllPostsDocument, DeletePostDocument, UserDocument } from '@/graphql/generated/graphql';
import { useMutation } from '@apollo/client/react';
import type { Dispatch, SetStateAction } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { toast } from 'sonner';
import { Button } from './ui/button';

interface DeletePostDialogProps {
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  username: string;
}

export function DeletePostDialog({ id, open, setOpen, username }: DeletePostDialogProps) {
  const [deletePost] = useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [AllPostsDocument, { query: UserDocument, variables: { username } }],
    variables: { id },
  });
  async function onSubmit() {
    try {
      const deletePostFetchResult = await deletePost({ variables: { id } });

      if (deletePostFetchResult.error) {
        throw new Error(deletePostFetchResult.error.message);
      }

      toast.success('Your post has been deleted.');
    } catch {
      toast.error('Uh oh! Something went wrong.', {
        description: 'There was a problem with your request.',
      });
    }
  }

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your post. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onSubmit} variant="destructive">
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
