module.exports = {
  electronVersion: "39.2.7",
  appId: "dev.blanch.react-electron-starter",
  productName: "React Electron Starter",
  asar: true,
  directories: {
    output: "..",
    app: ".",
  },
  files: ["**/*"],
  extraResources: [
    {
      from: "drizzle",
      to: "drizzle",
    },
  ],
  win: {
    target: "nsis",
    icon: "public/icon.ico",
  },
  mac: {
    target: "dmg",
  },
  linux: {
    target: "AppImage",
  },
};
