import { Hono } from "hono";

const app = new Hono().get("/", (c) => {
  return c.json({
    success: true,
    messsage: "Test route",
  });
});

export default app;
