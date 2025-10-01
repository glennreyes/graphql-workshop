'use client';

interface ProfilePageProps {
  username: string;
}

export function ProfilePage({ username }: ProfilePageProps) {
  // TODO(@exercise-01): Fetch `Me` and `User` data with `useSuspenseQuery`.
  // TODO(@exercise-01): Render the full profile layout once the queries resolve.
  return (
    <main className="container py-12">
      <section className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        <h2 className="text-xl font-semibold">Profile page placeholder</h2>
        <p className="mt-2">Load @{username} from GraphQL and populate this view.</p>
      </section>
    </main>
  );
}
