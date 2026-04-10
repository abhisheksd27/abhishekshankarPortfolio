import { Routes, Route, useLocation } from "react-router-dom";

// admin
import Dashboard from "./admin/Dashboard.jsx";
import ExperienceAdmin from "./admin/Experience.jsx";
import EducationAdmin from "./admin/Education.jsx";
import CertificationAdmin from "./admin/Certification.jsx";
import ProjectsAdmin from "./admin/Projects.jsx";
import SkillsAdmin from "./admin/Skills.jsx";
import ContactAdmin from "./admin/Contact.jsx";
import Login from "./admin/Login.jsx";
import AdminNavbar from "./admin/AdminNavbar.jsx";

// public
import Portfolio from "./pages/Portfolio.jsx";

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdmin && location.pathname !== "/admin/login" && <AdminNavbar />}

      <Routes>
        <Route path="/" element={<Portfolio />} />

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/experience" element={<ExperienceAdmin />} />
        <Route path="/admin/education" element={<EducationAdmin />} />
        <Route path="/admin/certification" element={<CertificationAdmin />} />
        <Route path="/admin/projects" element={<ProjectsAdmin />} />
        <Route path="/admin/skills" element={<SkillsAdmin />} />
        <Route path="/admin/contact" element={<ContactAdmin />} />
      </Routes>
    </>
  );
}

export default App;