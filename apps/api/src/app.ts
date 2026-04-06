import { Hono } from "hono";
import v1 from "./routes";
import { corsMiddleware } from "./middleware/cors";

export const app = new Hono();

const routes = app.use("*", corsMiddleware).route("/v1", v1);

export type AppType = typeof routes;
