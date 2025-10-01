'use client';

import type { UserQuery, UserQueryVariables } from '@/graphql/generated/graphql';
import { UserDocument } from '@/graphql/generated/graphql';
import { useSuspenseQuery } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface EditProfileProps {
  username: string;
}

export function EditProfile({ username }: EditProfileProps) {
  const [open, setOpen] = useState(false);
  const {
    data: { user },
  } = useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, { variables: { username } });
  const formSchema = z.object({
    bio: z.string().or(z.undefined()),
    displayName: z.string().min(3, 'Please enter a display name.').or(z.undefined()),
    photo: z.url('Please enter a valid URL.').or(z.undefined()),
    username: z.string().min(3, 'Please enter a username.').or(z.undefined()),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      bio: user?.bio ?? undefined,
      displayName: user?.displayName ?? undefined,
      photo: user?.photo ?? undefined,
      username: user?.username,
    },
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO(@exercise-02): Wire up the `UpdateUser` mutation, close the dialog on success, and refresh cached data.
    toast.info('Update profile mutation not wired yet.', {
      description: `Pending payload: ${JSON.stringify(values)}`,
    });
  }

  // TODO(@exercise-02): Replace with the mutation loading state once `useMutation` is added.
  const pending = false;

  return (
    <Form {...form}>
      <Dialog onOpenChange={setOpen} open={open}>
        <Button onClick={() => setOpen(true)} variant="outline">
          Edit Profile
        </Button>
        <DialogContent className="sm:max-w-lg">
          <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Username</FormLabel>
                    <FormControl>
                      <Input className="col-span-3" disabled placeholder="glnnrys" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Display Name</FormLabel>
                    <FormControl>
                      <Input className="col-span-3" disabled={pending} placeholder="Glenn Reyes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Photo URL</FormLabel>
                    <FormControl>
                      <Input
                        className="col-span-3"
                        disabled={pending}
                        placeholder="https://github.com/glennreyes.png"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        className="col-span-3"
                        disabled={pending}
                        placeholder="Write something about you ..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button disabled={pending} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
