import { ipcMain, BrowserWindow } from "electron";
import { windowBoundsStore } from "./remember-window-bounds.store";

let mainWin: BrowserWindow;

export function setMainWindow(win: BrowserWindow) {
  mainWin = win;
}

export function registerWindowSizeIpcHandlers() {
  ipcMain.handle("window-get-state", () => windowBoundsStore.get("bounds"));

  ipcMain.handle("window-save-bounds", () => {
    if (!mainWin) return;
    const bounds = mainWin.getBounds();
    windowBoundsStore.set("bounds", {
      width: bounds.width,
      height: bounds.height,
      x: bounds.x,
      y: bounds.y,
      isMinimized: mainWin.isMinimized(),
      isMaximized: mainWin.isMaximized(),
    });
  });
}
