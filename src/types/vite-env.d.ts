/// <reference types="vite/client" />

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
    };
  };
}
