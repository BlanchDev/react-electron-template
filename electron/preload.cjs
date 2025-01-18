const { contextBridge, ipcRenderer } = require("electron");

// Counter API
const counterAPI = {
  get: () => ipcRenderer.invoke("getCounter"),
  increment: () => ipcRenderer.invoke("incrementCounter"),
  decrement: () => ipcRenderer.invoke("decrementCounter"),
  reset: () => ipcRenderer.invoke("resetCounter"),
};

// Expose APIs to renderer process
contextBridge.exposeInMainWorld("Electron", {
  counter: counterAPI,
});
