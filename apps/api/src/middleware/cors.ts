import { cors } from "hono/cors";

const allowedOrigins = [process.env.CLIENT_URL!];

export const corsMiddleware = cors({
  origin: allowedOrigins,
  allowMethods: ["GET", "POST", "PUT", "DELETE"],
  allowHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
  credentials: true,
});
