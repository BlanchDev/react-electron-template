import { HashRouter, BrowserRouter } from "react-router-dom";

const MainAppRouter = window.Electron ? HashRouter : BrowserRouter;

export default MainAppRouter;
