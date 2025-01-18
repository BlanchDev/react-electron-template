import { createRoot } from "react-dom/client";
import "./global.scss";
import App from "./App.jsx";
import MainAppRouter from "./MainAppRouter.js";

createRoot(document.getElementById("root")).render(
  <MainAppRouter>
    <App />
  </MainAppRouter>,
);
