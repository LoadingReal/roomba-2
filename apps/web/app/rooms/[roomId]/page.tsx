"use client";

import { useState, FormEvent } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/hc";

export default function RoomChatPage() {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.messages.add.$post({
        json: { message, roomId: roomId as string },
      });
      console.log("Message sent!");
      setMessage("");
    } catch (e) {
      console.error("Failed to send message", e);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex-1 rounded-lg border bg-gray-50 p-4">
        <p className="text-gray-400">Viewing Room: {roomId}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          className="input flex-1 rounded border p-2"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary rounded bg-green-500 p-2 text-white"
        >
          Send
        </button>
      </form>
    </div>
  );
}
