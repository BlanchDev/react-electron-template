import { ipcMain } from "electron";
import { counterStore } from "./counter.store";

export function registerCounterIpcHandlers() {
  ipcMain.handle("count-get", () => {
    console.log("✅ React 'get-count'");
    const count = counterStore.get("count");
    console.log("📊 Current count:", count);
    return count;
  });

  ipcMain.handle("count-set", (_event, newCount: number) => {
    console.log("💾 React 'set-count', new value:", newCount);
    counterStore.set("count", newCount);
    return newCount;
  });
}
