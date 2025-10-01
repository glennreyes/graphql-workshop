'use client';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function UserAvatar() {
  // TODO(@exercise-01): Use `useSuspenseQuery` with the `Me` operation to load the viewer.
  // TODO(@exercise-01): Derive initials with `getInitials` and link to `/@{username}`.
  return (
    <Avatar data-state="placeholder">
      <AvatarImage src={undefined} />
      <AvatarFallback>Me</AvatarFallback>
    </Avatar>
  );
}
