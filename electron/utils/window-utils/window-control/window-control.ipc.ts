import { BrowserWindow, ipcMain } from "electron";

export function registerWindowControlIpcHandlers() {
  ipcMain.handle("window-minimize", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.minimize();
  });

  ipcMain.handle("window-maximize", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.maximize();
  });

  ipcMain.handle("window-unmaximize", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.unmaximize();
  });

  ipcMain.handle("window-is-maximized", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    return win?.isMaximized();
  });

  ipcMain.handle("window-close", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.close();
  });
}
