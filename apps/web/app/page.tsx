"use client";

import { FormEvent, useState } from "react";
import { authClient, signInWithGoogle, signOutWithGoogle } from "@/lib/auth";
import { apiClient } from "@/lib/hc";

export default function Home() {
  const { data: session } = authClient.useSession();
  const [message, setMessage] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const messageData = {
        message: message,
      };
      const response = await apiClient.messages.add.$post({
        json: messageData,
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.error("Failed to send message", e);
    }
  };

  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const roomData = {
        name: roomName,
      };
      const response = await apiClient.rooms.create.$post({
        json: roomData,
      });
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.error("Failed to create room", e);
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
      <form onSubmit={handleCreateRoom}>
        <input type="text" onChange={(e) => setRoomName(e.target.value)} />
        <button type="submit">Create Room</button>
      </form>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
