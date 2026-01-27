import { app, shell, BrowserWindow, protocol, net } from "electron";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createMainWindow } from "./windows/main.window";
import { registerCounterIpcHandlers } from "./utils/counter/counter.ipc";
import { registerWindowControlIpcHandlers } from "./utils/window-utils/window-control/window-control.ipc";
import { registerWindowSizeIpcHandlers } from "./utils/window-utils/remember-window-bounds/remember-window-bounds.ipc";
import { runMigrations } from "./db/db";

process.on("uncaughtException", (error) => {
  console.error("CRITICAL ERROR:", error);
});

protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: { standard: true, secure: true, supportFetchAPI: true },
  },
]);

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
}

const isAllowedOrigin = (url: string) => {
  if (url.startsWith("http://localhost:5173")) return true;
  if (url.startsWith("app://react-electron-starter")) return true;
  return false;
};

app.on("second-instance", () => {
  const win = BrowserWindow.getAllWindows()[0];
  if (win) {
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.whenReady().then(() => {
  protocol.handle("app", (req) => {
    const { host, pathname } = new URL(req.url);

    if (host !== "react-electron-starter")
      return new Response("bad", { status: 400 });

    const rendererRoot = path.resolve(app.getAppPath(), "dist/react");
    const safePath = pathname === "/" ? "/index.html" : pathname;

    const pathToServe = path.resolve(rendererRoot, "." + safePath);
    const relativePath = path.relative(rendererRoot, pathToServe);
    const isSafe =
      relativePath &&
      !relativePath.startsWith("..") &&
      !path.isAbsolute(relativePath);

    if (!isSafe) return new Response("bad", { status: 400 });

    return net.fetch(pathToFileURL(pathToServe).toString());
  });

  runMigrations();

  registerWindowControlIpcHandlers();
  registerWindowSizeIpcHandlers();
  registerCounterIpcHandlers();

  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    console.log("Quitting app as all windows are closed.");
    app.quit();
  }
});

app.on("web-contents-created", (_e, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    if (!isAllowedOrigin(navigationUrl)) event.preventDefault();
  });

  contents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://")) shell.openExternal(url);
    return { action: "deny" };
  });
});
