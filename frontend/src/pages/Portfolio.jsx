import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";

import { DEFAULT_PORTFOLIO_DATA, mergePortfolioData } from "../data/portfolio";
import Activity from "../components/Activity";

function Portfolio() {
  const [data, setData] = useState(DEFAULT_PORTFOLIO_DATA);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/api/portfolio");
        if (res.data && typeof res.data === "object") {
          setData(mergePortfolioData(res.data));
        }
      } catch (err) {
        console.info("Using embedded portfolio dataset:", err.message);
      }
    };

    load();
  }, []);

  const copyToClipboard = (text, type) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    }
  };

  const experienceList = data.experience || DEFAULT_PORTFOLIO_DATA.experience;
  const educationList = data.education || DEFAULT_PORTFOLIO_DATA.education;
  const certList = data.certification || DEFAULT_PORTFOLIO_DATA.certification;
  const projectList = Array.isArray(data.projects)
    ? data.projects
    : Object.values(data.projects || {}).flat();

  const skillsMap = data.skills || DEFAULT_PORTFOLIO_DATA.skills;

  return (
    <div className="portfolio-root">
      <Navbar />

      <main className="content-container">
        {/* ================= HERO SECTION ================= */}
        <section id="about" className="hero-section">
          <div className="hero-meta-badge">
            <span>Associate Software Engineer</span>
            <span>•</span>
            <span className="meta-company">Accenture</span>
            <span>•</span>
            <span>Bengaluru</span>
          </div>

          <h1 className="hero-headline">
            {data.home?.name || "Abhishek Shankar"}
          </h1>

          <p className="hero-bio">
            {data.about?.desc ||
              "Associate Software Engineer at Accenture working in big data workflows, ETL/ELT pipelines, and cloud computing. Passionate about turning complex datasets into scalable intelligence while actively applying cybersecurity defense standards."}
          </p>

          <p className="profile-personal-note">B.E. in Information Science and Engineering · CMRIT · 8.42/10 CGPA</p>
          <div className="hero-actions">
            <a href="/resume/abhishek-shankar-resume.pdf" className="btn-secondary" download>Download Resume ↓</a>
            <a href="#projects" className="btn-primary">
              View Projects
            </a>

            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>

            <button
              type="button"
              onClick={() => copyToClipboard(data.contact?.email || "Abhishekdshankar@gmail.com", "email")}
              className="btn-secondary"
            >
              {copiedEmail ? "Email Copied" : "Copy Email"}
            </button>
          </div>

          <div className="hero-credentials-row">
            <div className="cred-item">
              <span className="cred-label">Focus</span>
              <span className="cred-value">Data Engineering & Cloud</span>
            </div>
            <div className="cred-item">
              <span className="cred-label">Current Role</span>
              <span className="cred-value">Accenture (Bengaluru)</span>
            </div>
            <div className="cred-item">
              <span className="cred-label">Production Reliability</span>
              <span className="cred-value">100+ recurring job failures resolved</span>
            </div>
            <div className="cred-item">
              <span className="cred-label">Core Stack</span>
              <span className="cred-value">Python • PySpark • SQL • AWS</span>
            </div>
          </div>
        </section>

        {/* ================= EXPERIENCE SECTION ================= */}
        <section id="experience" className="section-wrapper">
          <div className="section-header">
            <span className="section-label">Work History</span>
            <h2 className="section-heading">Professional Experience</h2>
            <p className="section-subheading">
              Track record of building data systems, ETL pipelines, and client web applications.
            </p>
          </div>

          <div className="experience-list">
            {experienceList.map((item, index) => {
              const techList = getTechList(item.technologies);

              return (
                <div key={index} className="experience-item">
                  <div className="exp-header">
                    <div>
                      <h3 className="exp-role">{item.role}</h3>
                      <div className="exp-company-row">
                        <span className="exp-company">{item.company}</span>
                        {item.location && <span>• {item.location}</span>}
                      </div>
                    </div>
                    <span className="exp-duration">{item.duration}</span>
                  </div>

                  {(item.description || item.desc) && (
                    <p className="exp-desc">{item.description || item.desc}</p>
                  )}

                  {item.highlights?.length > 0 && <ul className="detail-list">{item.highlights.map(point => <li key={point}>{point}</li>)}</ul>}
                  {techList.length > 0 && (
                    <div className="exp-tech-row">
                      <span className="exp-tech-label">Stack:</span>
                      {techList.map((tech, i) => (
                        <span key={i} className="tech-tag-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= PROJECTS SECTION ================= */}
        <section id="projects" className="section-wrapper">
          <div className="section-header">
            <span className="section-label">Engineering</span>
            <h2 className="section-heading">Featured Projects</h2>
            <p className="section-subheading">
              Selected data engineering, machine learning, and full-stack projects. ShopLakehouse is currently in progress.
            </p>
          </div>

          <div className="projects-grid">
            {projectList.map((project, idx) => {
              const { narrative, tags } = parseProjectSkills(project.description);

              return (
                <article key={project.github || idx} className={`project-card ${project.status === "in-progress" ? "project-in-progress" : ""}`}>
                  <div className="project-status-row"><span>{project.category || "Project"}</span>{project.status === "in-progress" && <span className="progress-badge">In progress</span>}</div>
                  <div>
                    <div className="project-top">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-link-icons">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon-btn"
                            title="GitHub Repository"
                            aria-label="GitHub Repository"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon-btn"
                            title={project.linkLabel || "View project"}
                            aria-label={`${project.title}: ${project.linkLabel || "View project"}`}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="project-desc">{narrative}</p>
                    {project.highlights?.length > 0 && <ul className="detail-list">{project.highlights.map(point => <li key={point}>{point}</li>)}</ul>}
                    {project.nextSteps?.length > 0 && <div className="next-milestones"><h4>Next milestones</h4><ul className="detail-list">{project.nextSteps.map(point => <li key={point}>{point}</li>)}</ul></div>}
                  </div>

                  <div className="project-footer">
                    {tags.length > 0 && (
                      <div className="project-tags">
                        {tags.map((t, i) => (
                          <span key={i} className="tech-tag-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="project-actions">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-card-action primary"
                        >
                          {project.linkLabel || "View project"} ↗
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-card-action secondary"
                        >
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <Activity />

        {/* ================= SKILLS MATRIX ================= */}
        <section id="skills" className="section-wrapper">
          <div className="section-header">
            <span className="section-label">Competencies</span>
            <h2 className="section-heading">Skills & Technologies</h2>
            <p className="section-subheading">
              Technical tools and frameworks utilized across distributed data processing and software development.
            </p>
          </div>

          <div className="skills-matrix">
            {renderSkillCategoryBox(
              "Data Engineering & Cloud",
              skillsMap.dataEngineering || DEFAULT_PORTFOLIO_DATA.skills.dataEngineering
            )}

            {renderSkillCategoryBox(
              "Cybersecurity & Defense",
              skillsMap.cyberSecurity || DEFAULT_PORTFOLIO_DATA.skills.cyberSecurity
            )}

            {renderSkillCategoryBox(
              "Programming Languages",
              skillsMap.programmingLanguages || DEFAULT_PORTFOLIO_DATA.skills.programmingLanguages
            )}

            {renderSkillCategoryBox(
              "Full Stack Architecture",
              skillsMap.fullStack || DEFAULT_PORTFOLIO_DATA.skills.fullStack
            )}

            {renderSkillCategoryBox(
              "Databases & Storage",
              skillsMap.databases || DEFAULT_PORTFOLIO_DATA.skills.databases
            )}

            {renderSkillCategoryBox(
              "Developer Tools & Infrastructure",
              skillsMap.applications || DEFAULT_PORTFOLIO_DATA.skills.applications
            )}
            {renderSkillCategoryBox("AI Development Tools", skillsMap.aiTools || DEFAULT_PORTFOLIO_DATA.skills.aiTools)}
          </div>
        </section>

        {/* ================= CERTIFICATIONS SECTION ================= */}
        <section id="certifications" className="section-wrapper">
          <div className="section-header">
            <span className="section-label">Credentials</span>
            <h2 className="section-heading">Certifications</h2>
            <p className="section-subheading">
              Courses and certifications across data engineering, infrastructure, system design, and cybersecurity.
            </p>
          </div>

          <div className="cert-list-grid">
            {certList.map((cert, index) => (
              <div key={index} className="cert-item-card">
                <div>
                  <div className="cert-issuer-badge">{cert.issuer || "Google"}</div>
                  <h3 className="cert-name">{cert.name?.trim()}</h3>
                  {cert.issued && <p className="cert-skills-note">Issued {cert.issued}</p>}
                  {cert.credentialId && <p className="credential-id">Credential ID: {cert.credentialId}</p>}
                  {cert.skills && <p className="cert-skills-note">{cert.skills}</p>}
                </div>

                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify-link"
                  >
                    {cert.linkLabel || "View credential"} ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ================= EDUCATION SECTION ================= */}
        <section id="education" className="section-wrapper">
          <div className="section-header">
            <span className="section-label">Academics</span>
            <h2 className="section-heading">Education</h2>
          </div>

          <div className="edu-list">
            {educationList.map((item, index) => (
              <div key={index} className="edu-card">
                <div>
                  <h3 className="edu-degree">{item.degree}</h3>
                  <p className="edu-college">{item.college}</p>
                  {item.result && <p className="education-result">{item.result}</p>}
                </div>
                <span className="edu-year">{item.year}</span>
              </div>
            ))}
          </div>
          <article className="achievement-panel">
            <span className="section-label">Achievement · August 2022</span>
            <h3>Smart India Hackathon 2022 · Final Round</h3>
            <p>Qualified for the final round with a transportation and logistics application combining local-store ordering with district-level bike and car rentals.</p>
            <a href="https://www.linkedin.com/in/abhishekshankar27/" target="_blank" rel="noopener noreferrer">View on LinkedIn ↗</a>
          </article>
          <p className="profile-personal-note">Beyond engineering: cycling, running, football, badminton, drawing, and video editing.</p>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section id="contact" className="section-wrapper">
          <div className="section-header">
            <span className="section-label">Contact</span>
            <h2 className="section-heading">Get In Touch</h2>
            <p className="section-subheading">
              Open to discussions regarding data engineering architecture, pipeline optimization, and software opportunities.
            </p>
          </div>

          <div className="contact-panel">
            <div className="contact-bio-col">
              <h3>Let&apos;s connect.</h3>
              <p>
                Feel free to reach out directly via email or connect through LinkedIn and GitHub.
              </p>

              <div className="socials-row">
                <a href="https://leetcode.com/u/ABHISHEKSHANKAR27/" target="_blank" rel="noopener noreferrer" className="social-link-btn">LeetCode ↗</a>
                {data.contact?.github && (
                  <a
                    href={data.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-btn"
                  >
                    GitHub ↗
                  </a>
                )}

                {data.contact?.linkedin && (
                  <a
                    href={data.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-btn"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </div>
            </div>

            <div className="contact-items-col">
              <div className="contact-row-box">
                <div>
                  <span className="contact-label-text">Direct Email</span>
                  <div className="contact-value-text">
                    <a
                      href={`mailto:${data.contact?.email || "Abhishekdshankar@gmail.com"}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {data.contact?.email || "Abhishekdshankar@gmail.com"}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-mini-copy"
                  onClick={() => copyToClipboard(data.contact?.email || "Abhishekdshankar@gmail.com", "email")}
                >
                  {copiedEmail ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="contact-row-box">
                <div>
                  <span className="contact-label-text">Phone</span>
                  <div className="contact-value-text">
                    <a
                      href={`tel:${data.contact?.phone || "7338006503"}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      +91 {data.contact?.phone || "7338006503"}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-mini-copy"
                  onClick={() => copyToClipboard(data.contact?.phone || "7338006503", "phone")}
                >
                  {copiedPhone ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="contact-row-box">
                <div>
                  <span className="contact-label-text">Location</span>
                  <div className="contact-value-text">Bengaluru, India (IST)</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="site-footer">
        <div className="content-container">
          <div className="footer-flex">
            <span>© {new Date().getFullYear()} Abhishek Shankar.</span>
            <div className="footer-nav">
              <a href="#about">About</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
              <a href="/admin/login" style={{ opacity: 0.5 }}>Admin</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helpers
function renderSkillCategoryBox(title, items = []) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="skill-category-box" key={title}>
      <h3 className="skill-cat-title">{title}</h3>
      <div className="skill-tags-flow">
        {items.map((item, idx) => (
          <span key={idx} className="skill-tag-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function parseProjectSkills(desc = "") {
  if (!desc) return { narrative: "No description provided.", tags: [] };

  const parts = desc.split(/Skills:\s*/i);
  const narrative = parts[0]?.trim() || desc;
  const rawSkills = parts[1]?.trim() || "";

  const tags = rawSkills
    ? rawSkills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return { narrative, tags };
}

function getTechList(tech) {
  if (Array.isArray(tech)) return tech.filter(Boolean);
  if (typeof tech === "string" && tech.trim()) {
    return tech.split(",").map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

export default Portfolio;