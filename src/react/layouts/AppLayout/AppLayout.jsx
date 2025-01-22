import { Outlet } from "react-router-dom";
import CounterProvider from "./context/CounterProvider";
import "./AppLayout.scss";

function AppLayout() {
  return (
    <CounterProvider>
      <div
        className={`app-layout column ${window.Electron ? "itsElectron" : ""}`}
      >
        <Outlet />
      </div>
    </CounterProvider>
  );
}

export default AppLayout;
