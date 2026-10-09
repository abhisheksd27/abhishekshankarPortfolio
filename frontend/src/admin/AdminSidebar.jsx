import { Link } from "react-router-dom";
import "./admin.css";

function AdminSidebar() {
  return (
    <nav style={sidebarStyle}>
      <Link to="/admin/dashboard" style={linkStyle}>Dashboard</Link>
      <Link to="/admin/experience" style={linkStyle}>Experience</Link>
      <Link to="/admin/education" style={linkStyle}>Education</Link>
      <Link to="/admin/certification" style={linkStyle}>Certification</Link>
      <Link to="/admin/projects" style={linkStyle}>Projects</Link>
      <Link to="/admin/skills" style={linkStyle}>Skills</Link>
      <Link to="/admin/contact" style={linkStyle}>Contact</Link>
    </nav>
  );
}

const sidebarStyle = {
  backgroundColor: "#080c14",
  borderRight: "1px solid rgba(255, 255, 255, 0.08)",
  padding: "20px 16px",
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const linkStyle = {
  color: "#94a3b8",
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: "8px"
};

export default AdminSidebar;