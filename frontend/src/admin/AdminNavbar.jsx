import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./admin.css";

function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const closeMenu = () => setMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="admin-header">
      <div className="admin-navbar">
        <div className="admin-brand">Admin Panel</div>

        <button
          className={`admin-hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`admin-nav-links ${menuOpen ? "show" : ""}`}>
          <Link
            to="/admin/dashboard"
            className={isActive("/admin/dashboard") ? "active" : ""}
            onClick={closeMenu}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/experience"
            className={isActive("/admin/experience") ? "active" : ""}
            onClick={closeMenu}
          >
            Experience
          </Link>

          <Link
            to="/admin/education"
            className={isActive("/admin/education") ? "active" : ""}
            onClick={closeMenu}
          >
            Education
          </Link>

          <Link
            to="/admin/certification"
            className={isActive("/admin/certification") ? "active" : ""}
            onClick={closeMenu}
          >
            Certification
          </Link>

          <Link
            to="/admin/projects"
            className={isActive("/admin/projects") ? "active" : ""}
            onClick={closeMenu}
          >
            Projects
          </Link>

          <Link
            to="/admin/skills"
            className={isActive("/admin/skills") ? "active" : ""}
            onClick={closeMenu}
          >
            Skills
          </Link>

          <Link
            to="/admin/contact"
            className={isActive("/admin/contact") ? "active" : ""}
            onClick={closeMenu}
          >
            Contact
          </Link>

          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default AdminNavbar;