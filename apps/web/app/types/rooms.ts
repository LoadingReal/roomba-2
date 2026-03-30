import { apiClient } from "@/lib/hc";
import { InferResponseType } from "hono";

export type GetRoomsResponse = InferResponseType<typeof apiClient.rooms.$get>;
export type Room = GetRoomsResponse extends { rooms: Array<infer R> }
  ? R
  : never;
