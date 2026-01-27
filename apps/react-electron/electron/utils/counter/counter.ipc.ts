import { ipcMain } from "electron";
import { isAllowedSender } from "../isAllowedSender";
import { CounterStore } from "./counter.store";

export function registerCounterIpcHandlers() {
  ipcMain.handle("count-get", (event) => {
    if (!isAllowedSender(event)) throw new Error("Forbidden");

    return CounterStore.get();
  });

  ipcMain.handle("count-set", (event, newCount: number) => {
    if (!isAllowedSender(event)) throw new Error("Forbidden");

    CounterStore.set(newCount);
    return newCount;
  });

  ipcMain.handle("count-reset", (event) => {
    if (!isAllowedSender(event)) throw new Error("Forbidden");

    CounterStore.reset();
    return 21;
  });
}
