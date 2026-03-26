"use client";

import { FormEvent, useState } from "react";
import { authClient, signInWithGoogle, signOutWithGoogle } from "./lib/auth";

export default function Home() {
  const { data: session } = authClient.useSession();
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        message: message,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/messages/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );
      console.log(response);
    } catch (e) {
      console.error("Failed to send message", e);
    }
  };

  return (
    <div>
      {session ? (
        <button onClick={signOutWithGoogle}>Sign out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
      <h1>Hi</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
