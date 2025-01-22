import { ipcMain } from "electron";
import counterStore from "../store/counterStore.js";

function counterHandler() {
  ipcMain.handle("getCounter", () => {
    return counterStore.get("count");
  });

  ipcMain.handle("incrementCounter", () => {
    counterStore.set("count", counterStore.get("count") + 1);
    return counterStore.get("count");
  });

  ipcMain.handle("decrementCounter", () => {
    counterStore.set("count", counterStore.get("count") - 1);
    return counterStore.get("count");
  });

  ipcMain.handle("resetCounter", () => {
    counterStore.set("count", 0);
    return counterStore.get("count");
  });
}

export default counterHandler;
