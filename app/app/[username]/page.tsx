import { ProfilePage } from '@/components/profile-page';
import { notFound } from 'next/navigation';

interface UserProfileProps {
  params?: Promise<{ username: string }>;
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { username: rawUsername } = (await params) ?? {};

  if (typeof rawUsername !== 'string') {
    notFound();
  }

  const handle = decodeURIComponent(rawUsername);

  if (!handle.startsWith('@')) {
    notFound();
  }

  const username = handle.slice(1);

  return <ProfilePage username={username} />;
}
