// Small helper to access it without using `window` on the renderer side.
// Electron preload provides this via `contextBridge.exposeInMainWorld("elapi", ...)`.

export const elapi = globalThis.elapi;
