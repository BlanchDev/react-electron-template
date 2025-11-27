import { app, BrowserWindow, ipcMain } from "electron";
import { createMainWindow } from "./windows/main.window";
import { registerCounterIpcHandlers } from "./utils/counter/counter.ipc";
import { registerWindowControlIpcHandlers } from "./utils/window-utils/window-control/window-control.ipc";
import { registerWindowSizeIpcHandlers } from "./utils/window-utils/remember-window-bounds/remember-window-bounds.ipc";
import { windowBoundsStore } from "./utils/window-utils/remember-window-bounds/remember-window-bounds.store";

app.whenReady().then(() => {
  registerWindowControlIpcHandlers();
  registerWindowSizeIpcHandlers();
  registerCounterIpcHandlers();

  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
