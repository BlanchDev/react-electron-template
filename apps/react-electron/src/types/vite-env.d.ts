/// <reference types="vite/client" />

declare global {
  interface Window {
    elapi: {
      window: {
        minimize: () => Promise<void>;
        maximize: () => Promise<void>;
        unmaximize: () => Promise<void>;
        isMaximized: () => Promise<boolean>;
        close: () => Promise<void>;
      };

      count: {
        get: () => Promise<number>;
        set: (count: number) => Promise<number>;
        reset: () => Promise<number>;
      };
    };
  }

  var elapi: Window["elapi"];
}

export {};
