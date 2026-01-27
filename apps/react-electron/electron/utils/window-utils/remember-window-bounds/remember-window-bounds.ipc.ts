import { ipcMain, BrowserWindow } from "electron";
import { isAllowedSender } from "../../isAllowedSender";
import { WindowStore } from "./remember-window-bounds.store";

let mainWin: BrowserWindow;

export function setMainWindow(win: BrowserWindow) {
  mainWin = win;
}

export function registerWindowSizeIpcHandlers() {
  ipcMain.handle("window-get-state", (event) => {
    if (!isAllowedSender(event)) throw new Error("Forbidden");

    return WindowStore.getBounds();
  });

  ipcMain.handle("window-save-bounds", (event) => {
    if (!isAllowedSender(event)) throw new Error("Forbidden");

    if (!mainWin) return;

    const bounds = mainWin.getBounds();
    WindowStore.saveBounds({
      width: bounds.width,
      height: bounds.height,
      x: bounds.x,
      y: bounds.y,
      isMinimized: mainWin.isMinimized(),
      isMaximized: mainWin.isMaximized(),
    });
  });
}
