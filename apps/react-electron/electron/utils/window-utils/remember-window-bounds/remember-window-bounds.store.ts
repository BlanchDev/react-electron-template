import Store from "electron-store";

interface WindowBounds {
  bounds: {
    width: number;
    height: number;
    x?: number;
    y?: number;
    isMinimized: boolean;
    isMaximized: boolean;
  };
}

export const windowBoundsStore = new Store<WindowBounds>({
  defaults: {
    bounds: {
      width: 1200,
      height: 860,
      x: undefined,
      y: undefined,
      isMinimized: false,
      isMaximized: false,
    },
  },
});
