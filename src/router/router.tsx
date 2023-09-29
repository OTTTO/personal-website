import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Resume } from "pages/Resume/Resume";
import { AdminLogin } from "pages/Login/AdminLogin";
import { Home } from "pages/Home/Home";
import { Trouble } from "pages/Projects/Trouble";
import { Projects } from "pages/Projects/Projects";
import { PasswordGenerator } from "pages/Projects/PasswordGenerator";
import { Blog } from "pages/Blog/Blog";
import { Post } from "pages/Blog/Post";
import { Mentorship } from "pages/Mentorship/Mentorship";
import { Recognition } from "pages/Reecognition/Recognition";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/trouble" element={<Trouble />} />
        <Route
          path="/projects/password-generator"
          element={<PasswordGenerator />}
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/post/new" element={<Post />} />
        <Route path="/blog/post/:id" element={<Post />} />
        <Route path="/blog/post/edit/:id" element={<Post />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/recognition" element={<Recognition />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
