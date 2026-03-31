"use client";

import { FormEvent, useEffect, useState } from "react";
import { authClient, signInWithGoogle, signOutWithGoogle } from "@/lib/auth";
import { apiClient } from "@/lib/hc";
import { Room } from "@/types/rooms";

export default function Home() {
  const { data: session } = authClient.useSession();
  const [message, setMessage] = useState<string>("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomName, setRoomName] = useState<string>("");

  useEffect(() => {
    if (!session) {
      setRooms([]);
      return;
    }

    try {
      const fetchData = async () => {
        const roomsResponse = await apiClient.rooms.$get();
        const roomsResult = await roomsResponse.json();

        if (roomsResult.success) {
          setRooms(roomsResult.rooms);
        }
      };

      fetchData();
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  }, [session]);

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
        <button className="btn btn-soft btn-error" onClick={signOutWithGoogle}>
          Sign out
        </button>
      ) : (
        <button className="btn btn-primary" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      )}
      <h1>Hi</h1>
      <form onSubmit={handleCreateRoom}>
        <input
          type="text"
          className="input"
          placeholder="Room name"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Create Room
        </button>
      </form>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
      <div className="flex flex-col gap-2">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border-primary flex flex-col rounded-md border p-2"
          >
            <span>ID: {room.id}</span>
            <span>{room.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
