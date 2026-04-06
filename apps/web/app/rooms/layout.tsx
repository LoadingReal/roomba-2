"use client";

import Sidebar from "@/components/sidebar";
import { authClient, signOutWithGoogle } from "@/lib/auth";

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = authClient.useSession();

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Chat App</h1>
          {session && (
            <button
              className="btn btn-soft btn-error"
              onClick={signOutWithGoogle}
            >
              Sign out
            </button>
          )}
        </header>
        {children}
      </main>
    </div>
  );
}
