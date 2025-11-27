import { Outlet } from "react-router-dom";
import ElectronTitleBar from "../../components/ElectronTitleBar/ElectronTitleBar";

function AppLayout() {
  return (
    <>
      <ElectronTitleBar />
      <Outlet />
    </>
  );
}

export default AppLayout;
