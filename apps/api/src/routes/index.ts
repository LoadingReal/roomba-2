import { Hono } from "hono";
import messages from "@/routes/messages";
import auth from "@/routes/auth";
import rooms from "@/routes/rooms";
import test from "@/routes/test";

const v1 = new Hono()
  .get("/", (c) => {
    return c.json({
      success: true,
      message: "Hello Hono!",
    });
  })
  .route("/api", auth)
  .route("/messages", messages)
  .route("/rooms", rooms)
  .route("/test", test);

export default v1;
