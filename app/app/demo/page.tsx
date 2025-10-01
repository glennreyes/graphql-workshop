import { Chat } from '@/components/chat';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default function DemoPage() {
  return (
    <div className="container mx-auto space-y-12 py-8">
      <div>
        <h1 className="mb-4 text-4xl font-bold">React 19 + GraphQL Demo</h1>
        <p className="text-muted-foreground">Showcasing React Server Components, Optimistic UI, and Subscriptions</p>
      </div>

      {/* React Server Component Demo */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>React Server Components</CardTitle>
            <CardDescription>
              Posts fetched on the server using GraphQL, demonstrating Next.js 15 and React 19 Server Components
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* TODO(@exercise-03): Import `Suspense` from 'react' and wrap `ServerPosts` in it with a streaming-friendly fallback. */}
            {/* TODO(@exercise-03): Import `<ServerPosts>` and render `<ServerPosts limit={5} />` once it loads data server-side. */}
            <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
              Server component placeholder – fetch posts on the server and stream them here.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* GraphQL Subscriptions Demo */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Real-time Chat with GraphQL Subscriptions</CardTitle>
            <CardDescription>Messages update in real-time using GraphQL subscriptions over WebSocket</CardDescription>
          </CardHeader>
          <CardContent>
            <Chat />
          </CardContent>
        </Card>
      </section>

      {/* Optimistic UI Info */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Optimistic UI with Likes</CardTitle>
            <CardDescription>
              Like buttons on posts demonstrate optimistic UI updates - the UI updates instantly while the mutation is
              in flight
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Visit the home page to see posts with like buttons. When you click like, the UI updates immediately
              (optimistically) while the GraphQL mutation is being processed. If the mutation fails, the UI will revert
              to the previous state.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
