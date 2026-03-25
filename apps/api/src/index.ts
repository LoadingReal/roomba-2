import { serve } from "@hono/node-server";
import { Hono } from "hono";
import v1 from "@/routes";
import "dotenv/config";
import { corsMiddleware } from "@/middleware/cors";

const app = new Hono();

app.use("*", corsMiddleware);

app.route("/v1", v1);

serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
