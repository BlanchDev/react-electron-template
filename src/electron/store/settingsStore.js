import Store from "electron-store";
import { storePath } from "../config/paths.js";

const settingsStore = new Store({
  cwd: storePath,
  name: "settings",
  defaults: {
    mainWindow: {
      isMaximized: true,
      size: {
        width: 1024,
        height: 576,
      },
    },
  },
});

export default settingsStore;
