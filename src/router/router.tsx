import { BrowserRouter, Route, Routes } from "react-router-dom";
import Resume from "pages/Resume/Resume";
import AdminLogin from "pages/Login/AdminLogin";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
