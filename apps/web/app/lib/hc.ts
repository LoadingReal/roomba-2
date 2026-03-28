import { hc } from "hono/client";
import { AppRoutes } from "../../../api/src";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const client = hc<AppRoutes>(baseUrl, { init: { credentials: "include" } });

export const apiClient = client.v1;
