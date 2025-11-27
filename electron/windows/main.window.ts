import { app, BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { windowBoundsStore } from "../utils/window-utils/remember-window-bounds/remember-window-bounds.store";

// Calculating __dirname for use in ESM modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

let win: BrowserWindow | null;

export function createMainWindow() {
  const savedBounds = windowBoundsStore.get("bounds") || {};

  win = new BrowserWindow({
    frame: false, // Custom borderless window
    width: savedBounds?.width ?? 1200,
    height: savedBounds?.height ?? 860,
    x: savedBounds?.x,
    y: savedBounds?.y,
    show: false,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true, // Security improvement
      nodeIntegration: false, // Never set to true
      sandbox: false, // May be required for preload script to access Node APIs
    },
  });

  if (app.isPackaged) {
    // Load from dist folder when packaged
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools(); // Automatically open DevTools in development
  }

  win.on("ready-to-show", () => {
    if (savedBounds.isMinimized) {
      win?.minimize();
    }
    if (savedBounds.isMaximized) {
      win?.maximize();
    }

    win?.show();
  });

  const saveState = () => {
    if (!win) return;

    try {
      const bounds = win.getBounds();
      const isMinimized = win.isMinimized();
      const isMaximized = win.isMaximized();

      if (isMinimized) {
        windowBoundsStore.set("bounds", {
          ...savedBounds,
          isMinimized: true,
        });
        return;
      }

      if (isMaximized) {
        windowBoundsStore.set("bounds", {
          ...savedBounds,
          isMaximized: true,
          isMinimized: false,
        });
      } else {
        windowBoundsStore.set("bounds", {
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height,
          isMaximized: false,
          isMinimized: false,
        });
      }
    } catch (e) {
      console.error("Pencere konumu kaydedilemedi:", e);
    }
  };

  win.on("resize", saveState);
  win.on("move", saveState);
  win.on("maximize", saveState);
  win.on("unmaximize", saveState);
  win.on("minimize", saveState);
  win.on("restore", saveState);

  win.on("close", saveState);

  return win;
}
