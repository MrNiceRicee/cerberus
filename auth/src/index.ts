import { Elysia } from "elysia";
import { db } from "./db/db";

const app = new Elysia()
  .decorate("db", db)
  .get("/", () => {
    const message = "Hello, Elysia!";

    return message;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
