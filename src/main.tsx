import { createRoot } from "react-dom/client";
import MainAppRouter from "./MainAppRouter.ts";
import App from "./App.tsx";
import "./styles/_dark-vars.scss";
import "./global.scss";

createRoot(document.getElementById("root")!).render(
  <MainAppRouter>
    <App />
  </MainAppRouter>,
);
