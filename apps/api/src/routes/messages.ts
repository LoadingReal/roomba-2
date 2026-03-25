import { Hono } from "hono";

const messages = new Hono();

messages.get("/", (c) => {
  return c.json({
    success: true,
    message: "Messages route",
  });
});

export default messages;
