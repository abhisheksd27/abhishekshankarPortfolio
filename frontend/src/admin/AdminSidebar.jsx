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
  backgroundColor: "#090a0f",
  borderRight: "1px solid #20222b",
  padding: "20px 16px",
  display: "flex",
  flexDirection: "column",
  gap: "4px"
};

const linkStyle = {
  color: "#a1a1aa",
  textDecoration: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "0.88rem",
  fontWeight: 500
};

export default AdminSidebar;