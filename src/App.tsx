import { Route, Routes } from "react-router-dom";
import HomePage from "./layouts/AppLayout/pages/HomePage/HomePage";
import AppLayout from "./layouts/AppLayout/AppLayout";

function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
