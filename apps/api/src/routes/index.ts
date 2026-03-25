import { Hono } from "hono";
import messages from "@/routes/messages";

const v1 = new Hono();

v1.get("/", (c) => {
  return c.json({
    success: true,
    message: "Hello Hono!",
  });
});

v1.route("/messages", messages);

export default v1;
