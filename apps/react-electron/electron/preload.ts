import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("elapi", {
  window: {
    minimize: () => ipcRenderer.invoke("window-minimize"),
    maximize: () => ipcRenderer.invoke("window-maximize"),
    unmaximize: () => ipcRenderer.invoke("window-unmaximize"),
    isMaximized: () => ipcRenderer.invoke("window-is-maximized"),
    close: () => ipcRenderer.invoke("window-close"),
  },
  count: {
    get: () => ipcRenderer.invoke("count-get"),
    set: (count: number) => ipcRenderer.invoke("count-set", count),
    reset: () => ipcRenderer.invoke("count-reset"),
  },
});
