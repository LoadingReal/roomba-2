import { Hono } from "hono";
import messages from "./messages";
import auth from "./auth";
import rooms from "./rooms";
import test from "./test";

const v1 = new Hono()
  .get("/", (c) => {
    return c.json({
      success: true,
      message: "Hello Hono!",
    });
  })
  .route("/api/auth", auth)
  .route("/messages", messages)
  .route("/rooms", rooms)
  .route("/test", test);

export default v1;
