import { app } from "electron";
import path from "node:path";
import fs from "node:fs";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";

const isDev = !app.isPackaged;

const dbFolder = app.getPath("userData");
const dbPath = path.join(dbFolder, "app.sqlite");

if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder, { recursive: true });
}

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });

export const runMigrations = () => {
  let migrationFolder: string;

  if (isDev) {
    migrationFolder = path.join(__dirname, "../db/drizzle");
  } else {
    const prodMigrationFolder =
      typeof process.resourcesPath === "string" && process.resourcesPath
        ? path.join(process.resourcesPath, "drizzle")
        : "";

    if (prodMigrationFolder && fs.existsSync(prodMigrationFolder)) {
      migrationFolder = prodMigrationFolder;
    } else {
      // Fallback to the development migrations folder if the production path is unavailable or invalid
      const fallbackMigrationFolder = path.join(__dirname, "../db/drizzle");
      migrationFolder = fallbackMigrationFolder;
      console.warn(
        "⚠️ Using fallback migrations folder because process.resourcesPath is undefined or the migrations folder does not exist:",
        fallbackMigrationFolder,
      );
    }
  }

  try {
    migrate(db, { migrationsFolder: migrationFolder });
    console.log("✅ Migrations applied successfully from:", migrationFolder);
  } catch (error) {
    console.error("❌ Migration failed:", error);
  }
};
