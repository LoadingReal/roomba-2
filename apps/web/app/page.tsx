"use client";

import { authClient, signInWithGoogle, signOutWithGoogle } from "./lib/auth";

export default function Home() {
  const { data: session } = authClient.useSession();
  return (
    <div>
      {session ? (
        <button onClick={signOutWithGoogle}>Sign out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
      <h1>Hi</h1>
    </div>
  );
}
