import Store from "electron-store";

interface CounterStoreSchema {
  count: number;
}

export const counterStore = new Store<CounterStoreSchema>({
  defaults: {
    count: 21,
  },
});
