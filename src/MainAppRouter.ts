import { HashRouter, BrowserRouter } from "react-router-dom";

const MainAppRouter = window.elapi ? HashRouter : BrowserRouter;

export default MainAppRouter;
