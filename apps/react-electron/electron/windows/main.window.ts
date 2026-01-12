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
    win?.focus();
  });

  let saveTimeout: NodeJS.Timeout | null = null;

  const saveBoundsState = () => {
    if (!win) return;

    try {
      const bounds = win.getBounds();
      const isMinimized = win.isMinimized();
      const isMaximized = win.isMaximized();

      const state: any = {
        width: bounds.width,
        height: bounds.height,
        isMinimized,
        isMaximized,
      };

      if (!isMaximized && !isMinimized) {
        state.x = bounds.x;
        state.y = bounds.y;
      }

      windowBoundsStore.set("bounds", state);
    } catch (e) {
      console.error("Pencere konumu kaydedilemedi:", e);
    }
  };

  const debouncedSave = () => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    saveTimeout = setTimeout(() => {
      saveBoundsState();
      saveTimeout = null;
    }, 1000);
  };

  win.on("resize", debouncedSave);
  win.on("move", debouncedSave);
  win.on("maximize", debouncedSave);
  win.on("unmaximize", debouncedSave);
  win.on("minimize", debouncedSave);
  win.on("restore", debouncedSave);

  win.on("close", () => {
    saveBoundsState();
  });

  return win;
}
