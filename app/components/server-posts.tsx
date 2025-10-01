import { getClient } from '@/lib/apollo-client';
import { AllPostsDocument, type AllPostsQuery } from '@/graphql/generated/graphql';
import { getInitials } from '@/lib/helpers';
import { DateTimeDisplay } from './date-time-display';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ServerPostsProps {
  limit?: number;
}

export async function ServerPosts({ limit }: ServerPostsProps = {}) {
  const client = getClient();
  const { data } = await client.query<AllPostsQuery>({
    query: AllPostsDocument,
  });

  if (!data) return null;

  const posts = limit ? data.allPosts.slice(0, limit) : data.allPosts;

  return (
    <div className="grid gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Posts (Server Component)</h2>
        <span className="text-muted-foreground text-sm">Fetched on server at {new Date().toLocaleTimeString()}</span>
      </div>
      <div className="grid gap-6">
        {posts.map((post) => (
          <article className="flex gap-4 rounded-lg border p-4" key={post.id}>
            <div>
              <Avatar>
                <AvatarImage src={post.user.photo ?? undefined} />
                <AvatarFallback>{getInitials(post.user.displayName ?? 'Anonymous')}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <header>
                <address className="not-italic" rel="author">
                  <span className="font-bold">{post.user.displayName}</span>{' '}
                  <span className="text-primary opacity-25">
                    @{post.user.username} · <DateTimeDisplay value={new Date(post.createdAt)} />
                  </span>
                </address>
              </header>
              <div className="mt-2">
                <p>{post.message}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
