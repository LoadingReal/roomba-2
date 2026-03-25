import { cors } from "hono/cors";

const allowedOrigins = ["http://localhost:3000"];

export const corsMiddleware = cors({
  origin: allowedOrigins,
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
  credentials: true,
});
