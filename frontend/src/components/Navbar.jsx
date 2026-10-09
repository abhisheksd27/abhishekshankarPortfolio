import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="site-nav">
      <div className="nav-container">
        <a href="#about" className="nav-brand">
          <span className="brand-dot" aria-hidden="true" />
          <span className="brand-name">Abhishek Shankar</span>
        </a>

        {/* Mobile Toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <a href="#contact" className="nav-cta-btn" onClick={() => setOpen(false)}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;