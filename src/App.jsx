import { Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./layouts/AppLayout/pages/HomePage/HomePAge";
import AppLayout from "./layouts/AppLayout/AppLayout";
import TopBar from "./components/TopBar/TopBar";

//TODO: Vitenin electron kurma paketinden kopya çek

function App() {
  return (
    <>
      {window.Electron && <TopBar />}

      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
