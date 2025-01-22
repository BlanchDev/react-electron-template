import { BrowserWindow } from "electron";
import { join } from "path";
import process from "process";
import { getDistPath, getPath } from "../config/paths.js";
import settingsStore from "../store/settingsStore.js";

function MainWindow() {
  const mainWindowSettings = settingsStore.get("mainWindow");

  const win = new BrowserWindow({
    width: mainWindowSettings.size.width,
    height: mainWindowSettings.size.height,
    minWidth: 1024,
    minHeight: 576,
    center: true,
    show: true,
    frame: false,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#000",
      symbolColor: "#43d4f8",
      height: 34,
    },
    paintWhenInitiallyHidden: true,
    backgroundColor: "#000000",
    title: "Vite + React + Electron Template",
    icon: join(getPath("electron", "assets", "icon.ico")),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      worldSafeExecuteJavaScript: true,
      enableRemoteModule: false,
      allowRunningInsecureContent: false,
      spellcheck: false,
      preload: join(getPath("electron", "preload.cjs")),
      backgroundThrottling: false,
      enablePreferredSizeMode: true,
      enableAccelerated2dCanvas: true,
      enableHardwareAcceleration: true,
    },
  });

  if (mainWindowSettings.isMaximized) {
    win.maximize();
  }

  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          process.env.NODE_ENV === "development"
            ? "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline';" +
              "style-src 'self' 'unsafe-inline';" +
              "connect-src 'self' ws://localhost:* http://localhost:*; " +
              "img-src 'self' data: https:; " +
              "font-src 'self' data:;"
            : "default-src 'self'; " +
              "script-src 'self';" +
              "style-src 'self';" +
              "connect-src 'self';" +
              "img-src 'self' data:;" +
              "font-src 'self' data:;",
        ],
      },
    });
  });

  win.on("resize", () => {
    const [width, height] = win.getSize();
    mainWindowSettings.size = { width, height };
    settingsStore.set("mainWindow", mainWindowSettings);
  });

  win.on("maximize", () => {
    mainWindowSettings.isMaximized = true;
    settingsStore.set("mainWindow", mainWindowSettings);
  });

  win.on("unmaximize", () => {
    mainWindowSettings.isMaximized = false;
    settingsStore.set("mainWindow", mainWindowSettings);
  });

  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools(); // Devtools aynı pencerede açılsın
  } else {
    win.loadFile(join(getDistPath("index.html")));
  }

  return win;
}

export default MainWindow;
