"use client";

import { useState, FormEvent } from "react";
import { apiClient } from "@/lib/hc";

export default function RoomsDashboard() {
  const [roomName, setRoomName] = useState("");

  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.rooms.create.$post({
        json: { name: roomName },
      });
      const data = await response.json();
      console.log("Room created:", data);
    } catch (e) {
      console.error("Failed to create room", e);
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-xl mb-4">Create a new Chat Room</h2>
      <form onSubmit={handleCreateRoom} className="flex gap-2">
        <input
          type="text"
          className="input border p-2 rounded"
          placeholder="Room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button type="submit" className="btn btn-primary bg-blue-500 text-white p-2 rounded">
          Create Room
        </button>
      </form>
      <p className="mt-4 text-gray-500 italic">Select a room from the sidebar to start chatting.</p>
    </div>
  );
}