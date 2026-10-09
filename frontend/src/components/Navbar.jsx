import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Certification", href: "#certification" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <header className="site-nav">
      <div className="nav-container">
        <a href="#about" className="nav-brand">
          <div className="brand-badge">AS</div>
          <div className="brand-info">
            <span className="brand-name">Abhishek Shankar</span>
            <span className="brand-role">Associate Software Engineer @ Accenture</span>
          </div>
        </a>

        {/* Mobile Toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>

        {/* Navigation items */}
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}

          <a href="#contact" className="nav-cta-btn" onClick={handleLinkClick}>
            Connect
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;