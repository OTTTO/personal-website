import { BrowserRouter, Route, Routes } from "react-router-dom";
import Resume from "pages/Resume/Resume";
import AdminLogin from "pages/Login/AdminLogin";
import { Home } from "pages/Home/Home";
import { Trouble } from "pages/Projects/Trouble";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/trouble" element={<Trouble />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
