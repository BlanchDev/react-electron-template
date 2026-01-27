import { BrowserWindow, ipcMain } from "electron";
import { isAllowedSender } from "../../isAllowedSender";

export function registerWindowControlIpcHandlers() {
  ipcMain.handle("window-minimize", (event) => {
    if (!isAllowedSender(event)) throw new Error("Forbidden");

    const win = BrowserWindow.fromWebContents(event.sender);
    win?.minimize();
  });

  ipcMain.handle("window-maximize", (event) => {
    if (!isAllowedSender(event)) throw new Error("Forbidden");

    const win = BrowserWindow.fromWebContents(event.sender);
    win?.maximize();
  });

  ipcMain.handle("window-unmaximize", (event) => {
    if (!isAllowedSender(event)) throw new Error("Forbidden");

    const win = BrowserWindow.fromWebContents(event.sender);
    win?.unmaximize();
  });

  ipcMain.handle("window-is-maximized", (event) => {
    if (!isAllowedSender(event)) throw new Error("Forbidden");

    const win = BrowserWindow.fromWebContents(event.sender);
    return win?.isMaximized();
  });

  ipcMain.handle("window-close", (event) => {
    if (!isAllowedSender(event)) throw new Error("Forbidden");

    const win = BrowserWindow.fromWebContents(event.sender);
    win?.close();
  });
}
