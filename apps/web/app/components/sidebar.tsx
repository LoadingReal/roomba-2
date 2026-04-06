"use client";

import { authClient } from "@/lib/auth";
import { apiClient } from "@/lib/hc";
import { GetRoomsResponse, Room } from "@/types/rooms";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const { data: session } = authClient.useSession();
  const [rooms, setRooms] = useState<Room[]>([]);
  const params = useParams();
  const currentRoomId = params?.roomId;

  useEffect(() => {
    if (!session) {
      setRooms([]);
      return;
    }

    const fetchData = async () => {
      try {
        const roomsResponse = await apiClient.rooms.$get();
        const roomsResult: GetRoomsResponse = await roomsResponse.json();

        if (roomsResult.success) {
          setRooms(roomsResult.rooms);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, [session]);

  return (
    <aside className="flex h-screen w-64 flex-col gap-4 border-r bg-gray-50 p-4">
      <div className="px-2 text-xl font-bold">Rooms</div>

      <div className="flex flex-col gap-2 overflow-y-auto">
        {rooms.map((room) => (
          <Link
            key={room.id}
            href={`/rooms/${room.id}`}
            className={`flex flex-col rounded-md border p-3 transition-colors ${
              currentRoomId === room.id
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="font-mono text-xs opacity-70">
              ID: {room.id.slice(0, 8)}...
            </span>
            <span className="font-semibold">{room.name}</span>
          </Link>
        ))}

        {rooms.length === 0 && (
          <p className="mt-4 text-center text-sm text-gray-400">
            No rooms found
          </p>
        )}
      </div>

      <div className="mt-auto border-t pt-4">
        <Link
          href="/rooms"
          className="px-2 text-sm text-blue-500 hover:underline"
        >
          + Create New Room
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
