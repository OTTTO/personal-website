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
import { Index } from "pages/Projects/DataStructures/Index";
import { StackPage } from "pages/Projects/DataStructures/Stack/StackPage";
import { QueuePage } from "pages/Projects/DataStructures/Queue/QueuePage";
import { SLLPage } from "pages/Projects/DataStructures/LinkedList/SLLPage";
import { DLLPage } from "pages/Projects/DataStructures/LinkedList/DLLPage";

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
        <Route path="/projects/xplained/ds" element={<Index />} />
        <Route path="/projects/xplained/ds/stack" element={<StackPage />} />
        <Route path="/projects/xplained/ds/queue" element={<QueuePage />} />
        <Route path="/projects/xplained/ds/sll" element={<SLLPage />} />
        <Route path="/projects/xplained/ds/dll" element={<DLLPage />} />
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
