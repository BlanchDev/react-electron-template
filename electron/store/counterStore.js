import Store from "electron-store";
import { storePath } from "../config/paths.js";

const counterStore = new Store({
  cwd: storePath,
  name: "counter",
  defaults: {
    count: 0,
  },
});

export default counterStore;
