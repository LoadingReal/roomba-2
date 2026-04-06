import { hc } from "hono/client";
import type { AppType } from "../../../api/src/app";

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

const client = hc<AppType>(baseUrl, {
  init: { credentials: "include" },
});

export const apiClient = client.v1;
