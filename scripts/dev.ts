import { spawn } from "node:child_process";

function run(cmd: string, args: string[]) {
  return spawn(cmd, args, { stdio: "inherit", shell: true });
}

const killPorts = () => {
  run("bun", ["run", "kill-all"]);
};

const child = run("bun", ["run", "--filter", "*", "dev"]);

const shutdown = () => {
  try {
    child.kill("SIGINT");
  } catch (error) {
    console.error(
      "Failed to send SIGINT to child process during shutdown:",
      error,
    );
  }
  setTimeout(killPorts, 300);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("exit", killPorts);
