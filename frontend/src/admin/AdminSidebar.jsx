import { Link } from "react-router-dom";
import "./admin.css";

function AdminNavbar() {
  return (
    <nav style={{ backgroundColor: "#1e1e1e", color: "#00ff00" }}>
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/experience">Experience</Link>
      <Link to="/admin/education">Education</Link>
      <Link to="/admin/certification">Certification</Link>
      <Link to="/admin/projects">Projects</Link>
      <Link to="/admin/skills">Skills</Link>
      <Link to="/admin/contact">Contact</Link>
    </nav>
  );
}

export default AdminNavbar;