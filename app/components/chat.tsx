'use client';

import { useMutation, useQuery, useSubscription } from '@apollo/client/react';
import { getInitials } from '@/lib/helpers';
import { Send } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DateTimeDisplay } from './date-time-display';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import {
  AllMessagesDocument,
  SendMessageDocument,
  OnNewMessageDocument,
  type AllMessagesQuery,
  type SendMessageMutation,
  type OnNewMessageSubscription,
} from '@/graphql/generated/graphql';

export function Chat() {
  const [message, setMessage] = useState('');
  const { data, loading: queryLoading } = useQuery(AllMessagesDocument);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [sendMessage, { loading: isSending }] = useMutation(SendMessageDocument, {
    onCompleted: () => setMessage(''),
    onError: (error) => {
      console.error('Mutation error:', error);
    },
    update: (cache, { data }) => {
      if (!data?.sendMessage) return;

      const existingMessages = cache.readQuery<AllMessagesQuery>({ query: AllMessagesDocument });
      if (!existingMessages) return;

      cache.writeQuery({
        query: AllMessagesDocument,
        data: {
          allMessages: [...existingMessages.allMessages, data.sendMessage],
        },
      });
    },
  });

  useSubscription(OnNewMessageDocument, {
    onData: ({ client, data }) => {
      if (!data.data?.newMessage) return;

      const existingMessages = client.readQuery<AllMessagesQuery>({ query: AllMessagesDocument });
      if (!existingMessages) return;

      const newMessage = data.data.newMessage;

      // Check if message already exists (sent by current user)
      const messageExists = existingMessages.allMessages.some((msg) => msg.id === newMessage.id);

      if (!messageExists) {
        client.writeQuery({
          query: AllMessagesDocument,
          data: {
            allMessages: [...existingMessages.allMessages, newMessage],
          },
        });
      }
    },
    skip: !data,
  });

  const messages = useMemo(() => {
    const list = data?.allMessages ?? [];
    const seenIds = new Set<string>();
    return list.filter((msg) => {
      if (seenIds.has(msg.id)) {
        return false;
      }
      seenIds.add(msg.id);
      return true;
    });
  }, [data?.allMessages]);

  const showLoadingState = queryLoading && messages.length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isSending) {
      try {
        await sendMessage({ variables: { content: message } });
      } catch (err) {
        console.error('Failed to send message:', err);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Chat Room</CardTitle>
      </CardHeader>
      <CardContent>
        {showLoadingState ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-muted-foreground">Loading messages...</p>
          </div>
        ) : (
          <div className="h-96 space-y-4 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.user.photo ?? undefined} />
                  <AvatarFallback>{getInitials(msg.user.displayName ?? 'Anonymous')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold">{msg.user.displayName}</span>
                    <span className="text-muted-foreground text-xs">
                      <DateTimeDisplay value={new Date(msg.createdAt)} />
                    </span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <Input placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button type="submit" size="icon" disabled={isSending}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
