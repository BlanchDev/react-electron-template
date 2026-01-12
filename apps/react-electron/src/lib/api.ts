import { edenTreaty } from "@elysiajs/eden";
import type { App } from "@app/elysia"; // Importing the backend type

// Creating a type-safe client
export const api = edenTreaty<App>("http://localhost:3000");
