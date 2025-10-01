'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Textarea } from './ui/textarea';

export function CreatePostForm() {
  const formSchema = z.object({
    message: z.string().min(1, 'Please enter a message.'),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO(@exercise-02): Invoke the `CreatePost` mutation and handle success/error states.
    toast.info('Submit post mutation not wired yet.', {
      description: `Preview message: ${values.message || '...'} `,
    });
  }

  // TODO(@exercise-02): Replace with `createPost` loading state from Apollo.
  const pending = false;

  return (
    <Form {...form}>
      <form className="grid gap-4 px-4 pb-8" onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="text-primary text-2xl font-bold">Post</h2>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea disabled={pending} placeholder="What's happening?" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={pending} size="lg" type="submit">
            Send
          </Button>
        </div>
      </form>
    </Form>
  );
}
