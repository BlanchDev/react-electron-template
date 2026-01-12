import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { type User, type ApiResponse } from "@app/shared";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")

  .get("/user/me", (): ApiResponse<User> => {
    return {
      success: true,
      data: {
        id: 1,
        username: "Blanch",
        role: "admin",
        stats: {
          projects: 42,
          bugsFixed: 9999,
        },
      },
      message: "Data fetched successfully.",
    };
  })

  // Simple POST example (sending data from the frontend)
  .post(
    "/user/update-status",
    ({ body }: { body: { status: string; mood: string } }) => {
      console.log("Incoming data:", body);
      return { success: true, received: body };
    },
    {
      body: t.Object({
        status: t.String(),
        mood: t.String(),
      }),
    },
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

// IF YOU DON'T EXPORT THIS TYPE, REACT WILL BE BLIND
export type App = typeof app;
