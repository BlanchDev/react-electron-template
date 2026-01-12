import { $ } from "bun";

delete process.env.ELECTRON_RUN_AS_NODE;

try {
  await $`electron .`;
} catch (error) {
  console.log("error:", error);
  process.exit(0);
}
