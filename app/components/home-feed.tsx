'use client';

import { Feed } from './feed';

export function HomeFeed() {
  // TODO(@exercise-01): Load the viewer (`Me`) and all posts with `useSuspenseQuery`.
  // TODO(@exercise-01): Pass the loaded data to `<Feed me={...} posts={...} />`.
  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        TODO: Populate the home feed by querying posts and the current user.
      </div>
      <Feed posts={[]} />
    </div>
  );
}
