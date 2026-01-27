export function isAllowedSender(event: Electron.IpcMainInvokeEvent) {
  const url = event.senderFrame?.url; // string | undefined

  if (!url) return false;

  // Dev
  if (url.startsWith("http://localhost:5173")) return true;

  if (url.startsWith("app://react-electron-starter")) return true;

  return false;
}
