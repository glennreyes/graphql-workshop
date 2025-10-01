interface ServerPostsProps {
  limit?: number;
}

export async function ServerPosts({ limit }: ServerPostsProps = {}) {
  void limit;
  // TODO(@exercise-03): Use `getClient` from `@/lib/apollo-client` to run the `AllPosts` query server-side.
  // TODO(@exercise-03): Render the fetched posts with avatars, timestamps, and a heading similar to the finished demo.
  return (
    <div className="rounded-lg border border-dashed p-4 text-muted-foreground">
      Server component TODO – load posts on the server and display them here.
    </div>
  );
}
