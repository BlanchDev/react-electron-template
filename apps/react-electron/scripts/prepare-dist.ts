import { mkdirSync, rmSync, cpSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import mainPkg from "../package.json";

const run = (cmd: string, cwd: string) => {
  console.log(`Running: ${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
};

const rootDir = process.cwd();

const distDir = path.join(rootDir, "dist");
const releaseDir = path.join(distDir, "electron-release");
const tempBuildDir = path.join(releaseDir, "temp_build");

console.log("🧹 Cleaning temp build directory...");
try {
  rmSync(tempBuildDir, { recursive: true, force: true });
} catch (e) {
  console.warn("Cannot delete temp build dir, might not exist yet:", e);
}

mkdirSync(tempBuildDir, { recursive: true });

console.log("📂 Copying build artifacts...");

cpSync(
  path.join(distDir, "electron"),
  path.join(tempBuildDir, "dist", "electron"),
  { recursive: true },
);

cpSync(path.join(distDir, "react"), path.join(tempBuildDir, "dist", "react"), {
  recursive: true,
});

if (existsSync(path.join(rootDir, "public"))) {
  cpSync(path.join(rootDir, "public"), path.join(tempBuildDir, "public"), {
    recursive: true,
  });
}

const drizzleSource = path.join(rootDir, "electron", "db", "drizzle");
const drizzleDest = path.join(tempBuildDir, "drizzle");

if (existsSync(drizzleSource)) {
  console.log("🗄️ Copying migration files...");
  cpSync(drizzleSource, drizzleDest, { recursive: true });
} else {
  console.warn(
    "⚠️ Warning: No migration files found in 'electron/drizzle'. Did you run 'drizzle-kit generate'?",
  );
}

cpSync(
  path.join(rootDir, "electron-builder.config.cjs"),
  path.join(tempBuildDir, "electron-builder.config.cjs"),
);

console.log("📝 Generating production package.json...");
const pkg = {
  name: "@app/react-electron",
  productName: "React Electron Starter",
  version: "1.0.0",
  type: "module",
  main: "dist/electron/main.js",
  author: "blanch.dev",
  description: "React Electron Starter",
  dependencies: {
    "better-sqlite3": "^12.6.2",
    "drizzle-orm": "^0.45.1",
    elysia: "^1.4.22",
    "@elysiajs/eden": "^1.4.6",
  },
  devDependencies: {
    electron: mainPkg.devDependencies.electron,
  },
};
writeFileSync(
  path.join(tempBuildDir, "package.json"),
  JSON.stringify(pkg, null, 2),
);

console.log("📦 Installing dependencies...");
run("bun install --production", tempBuildDir);

console.log("🔧 Rebuilding native modules...");
const builderPath = path.join(
  rootDir,
  "node_modules",
  ".bin",
  "electron-builder",
);

run(`"${builderPath}" install-app-deps`, tempBuildDir);

console.log(`✅ Build preparation complete at: ${tempBuildDir}`);
