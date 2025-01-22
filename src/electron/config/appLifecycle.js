import { app, BrowserWindow } from "electron";
import process from "process";
import counterHandler from "../handlers/counterHandler.js";
import MainWindow from "../browser-windows/MainWindow.js";

let mainWindow = null;

async function appLifecycle() {
  try {
    await app.whenReady();

    mainWindow = MainWindow();

    // Setup handlers
    counterHandler();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        mainWindow.show();
      }
    });
  } catch (error) {
    console.error("App Lifecycle Error:", error);
  }

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
}

export default appLifecycle;
