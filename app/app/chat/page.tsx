import { Chat } from '@/components/chat';

export const dynamic = 'force-dynamic';

export default function ChatPage() {
  return (
    <main className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center py-10">
      <div className="w-full max-w-2xl">
        <Chat />
      </div>
    </main>
  );
}
