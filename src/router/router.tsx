import { BrowserRouter, Route, Routes } from "react-router-dom";
import Resume from "../pages/Resume/Resume";

function AppRoutes() {
    return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Resume />} />
        </Routes>
    </BrowserRouter>)
}

export default AppRoutes
