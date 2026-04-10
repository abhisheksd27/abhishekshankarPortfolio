import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <h2>Abhishek Shankar</h2>

      {/* ✅ Hamburger */}
      <div className={`hamburger ${open ? "active" : ""}`} onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* ✅ Links */}
      <div className={`nav-links ${open ? "open" : ""}`}>
        <a href="#home" onClick={() => setOpen(false)}>Home</a>
        
        <a href="#experience" onClick={() => setOpen(false)}>Experience</a>
        
        <a href="#education" onClick={() => setOpen(false)}>Education</a>
        <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
        <a href="#skills" onClick={() => setOpen(false)}>Skills</a>
        <a href="#certification" onClick={() => setOpen(false)}>Certification</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;