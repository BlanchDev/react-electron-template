import { app, BrowserWindow } from "electron";
import path from "node:path";
import { WindowStore } from "../utils/window-utils/remember-window-bounds/remember-window-bounds.store";

let win: BrowserWindow | null;

export function createMainWindow() {
  const savedBounds = WindowStore.getBounds() || {};

  win = new BrowserWindow({
    frame: false, // Custom borderless window
    titleBarStyle: "hidden",
    autoHideMenuBar: true,
    center: true,

    width: savedBounds?.width ?? 1200,
    height: savedBounds?.height ?? 860,
    x: savedBounds?.x,
    y: savedBounds?.y,
    show: false,
    paintWhenInitiallyHidden: true,
    backgroundColor: "#000",

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false, // Never set to true
      sandbox: true,
      webSecurity: true,
      preload: path.join(app.getAppPath(), "dist/electron/preload.cjs"),
    },
  });

  if (app.isPackaged) {
    win.loadURL("app://react-electron-starter/");
  } else {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
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

      WindowStore.saveBounds(state);
    } catch (e) {
      console.error("Failed to save window position:", e);
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
