import { app } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPath(...args) {
  return path.join(__dirname, "..", "..", ...args);
}

function getDistPath(...args) {
  return path.join(__dirname, "..", "..", "dist", ...args);
}

const storePath = path.join(app.getPath("userData"), "StoreFolder");

export { getPath, getDistPath, storePath };
