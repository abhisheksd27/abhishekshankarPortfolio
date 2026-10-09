import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";

// Authoritative fallback dataset ensuring immediate 0ms initial load
const DEFAULT_PORTFOLIO_DATA = {
  home: {
    name: "Abhishek Shankar",
    role: "Associate Software Engineer at Accenture",
    headline: "Data Engineer building resilient data pipelines and secure systems.",
  },
  about: {
    desc: "I am an Associate Software Engineer at Accenture working as a Data Engineer based in Bengaluru, India. I specialize in processing, transforming, and analyzing large-scale datasets, building robust ETL/ELT pipelines, and architecting cloud workflows. Alongside enterprise data engineering, I actively study cybersecurity threat analysis and secure system engineering.",
  },
  experience: [
    {
      role: "Associate Software Engineer",
      company: "Accenture",
      duration: "Sep 2024 – Present",
      location: "Bengaluru, India",
      description: "Working as a Data Engineer developing modern data workflows to process, transform, and analyze large enterprise datasets. Engineering resilient ETL/ELT pipelines, optimizing queries, and automating data orchestration across cloud environments.",
      technologies: [
        "Apache Spark",
        "Apache Airflow",
        "Amazon Redshift",
        "AWS (S3, EKS)",
        "Python",
        "SQL",
        "Docker",
        "Linux & Bash",
        "Jenkins CI/CD",
        "DBeaver"
      ],
    },
    {
      role: "Web Development Freelancer",
      company: "Freelance",
      duration: "Jan 2024 – Sep 2024",
      location: "Remote",
      description: "Delivered performant full-stack web applications and custom client portals with responsive architectures, secure JWT/OAuth authentication, and database optimizations.",
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "REST APIs",
        "Git & GitHub"
      ],
    },
    {
      role: "Machine Learning Intern",
      company: "Varcons Inc.",
      duration: "Feb 2024 – Mar 2024",
      location: "Bengaluru, India",
      description: "Built and evaluated predictive machine learning models, performed data preprocessing, feature engineering, and model evaluation using regression and ensemble methods.",
      technologies: [
        "Python",
        "Scikit-Learn",
        "Pandas",
        "NumPy",
        "Machine Learning",
        "Jupyter Notebooks"
      ],
    },
    {
      role: "Full-stack Intern",
      company: "Webstack Academy - WSA",
      duration: "Jan 2024 – Feb 2024",
      location: "Bengaluru, India",
      description: "Engineered scalable REST APIs, state management pipelines, and robust database models using the MERN stack with modern component architecture.",
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redux Toolkit",
        "Bootstrap / CSS"
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Engineering (Information Science and Engineering)",
      college: "CMR Institute of Technology, Bengaluru",
      year: "2020 – 2024",
    },
    {
      degree: "Pre - University (PCMB)",
      college: "R N Shetty PU College Kundapura",
      year: "2018 – 2020",
    },
  ],
  certification: [
    {
      name: "Google Cybersecurity Specialization",
      issuer: "Google via Coursera",
      link: "https://coursera.org/share/9685d5eda28b8a2632145987c9675a4b",
      skills: "Threat Intelligence, Network Defense, SIEM, Python, Linux",
    },
    {
      name: "Automate Cybersecurity Tasks with Python",
      issuer: "Google via Coursera",
      link: "https://www.coursera.org/account/accomplishments/verify/WOE75EBSP6JU",
      skills: "Python Scripting, Log Parsing, Security Automation",
    },
    {
      name: "Sound the Alarm: Detection and Response",
      issuer: "Google via Coursera",
      link: "https://www.coursera.org/account/accomplishments/verify/Y8PEGJKW9H5Z",
      skills: "Incident Response, Packet Analysis, IDS/IPS, SIEM",
    },
    {
      name: "Assets, Threats, and Vulnerabilities",
      issuer: "Google via Coursera",
      link: "https://www.coursera.org/account/accomplishments/verify/7308ZOCM7TNC",
      skills: "Risk Assessment, Vulnerability Auditing, Cryptography",
    },
    {
      name: "Tools of the Trade: Linux and SQL",
      issuer: "Google via Coursera",
      link: "https://www.coursera.org/account/accomplishments/verify/PMJAZT6LP6AQ",
      skills: "Bash, CLI Navigation, Relational Databases, SQL Auditing",
    },
  ],
  projects: [
    {
      title: "Authentication App using React",
      description: "A full-stack authentication system built using React, Node.js, Express, and MongoDB with JWT-based authentication. Supports user signup/login and Google Sign-In with protected routes, designed as a reusable template for future projects.\nSkills: React.js, Node.js, Express.js, MongoDB, JWT, Redux Toolkit, Tailwind CSS, JavaScript",
      link: "https://authentication-app-gczq.onrender.com/",
      github: "https://github.com/abhisheksd27/Authentication-MERN-project",
    },
    {
      title: "Chatbot using OpenAI API",
      description: "Developed a web-based chatbot using OpenAI API to deliver dynamic and intelligent responses. Implemented secure authentication and a database system to store user history for personalized experiences.\nSkills: JavaScript, Tailwind CSS, OpenAI API, Django, HTML5",
      link: "https://github.com/abhisheksd27/chatgpt-open-api-project",
      github: "https://github.com/abhisheksd27/chatgpt-open-api-project",
    },
    {
      title: "MERN Stack Blog Application",
      description: "Built a feature-rich blog platform with authentication using Google OAuth, state management with Redux, and real-time updates via Firebase. Includes admin panel, search functionality, and dark/light mode.\nSkills: MERN Stack, React.js, Node.js, Express.js, MongoDB, Firebase, Redux, Tailwind CSS, OAuth",
      link: "https://abhishekshankar.onrender.com/",
      github: "https://github.com/abhisheksd27/DevZone",
    },
    {
      title: "Road Accident Severity Prediction System",
      description: "Developed an ML-based system to predict accident severity using real-world accident data. Implemented data preprocessing, feature engineering, and ensemble ML models with a responsive web interface for real-time inference.\nSkills: Python, Machine Learning, Flask, Pandas, NumPy, Scikit-learn, HTML, CSS, JavaScript",
      link: "https://github.com/abhisheksd27/Road-Accident-Prediction-model",
      github: "https://github.com/abhisheksd27/Road-Accident-Prediction-model",
    },
    {
      title: "Route Planning & Location Management System",
      description: "Created a Django-based web application integrated with Google Maps API for route planning and location management with secure authentication and multi-waypoint routing features.\nSkills: Django, Google Maps API, JavaScript, HTML5, CSS, Tailwind CSS",
      link: "http://github.com/abhisheksd27/django-google-map-api-project",
      github: "http://github.com/abhisheksd27/django-google-map-api-project",
    },
  ],
  skills: {
    dataEngineering: [
      "Apache Spark",
      "Apache Airflow",
      "Amazon Redshift",
      "ETL / ELT Pipelines",
      "SQL",
      "Python",
      "AWS (EKS, S3, IAM)",
      "Docker",
      "Linux & Bash",
      "Jenkins CI/CD",
      "IWS",
      "DBeaver",
    ],
    cyberSecurity: [
      "SIEM Platforms",
      "Incident Response",
      "Threat Management",
      "Network Security",
      "Security Controls",
      "Vulnerability & Compliance",
      "Risk Analysis",
      "Information Assurance",
      "Data Ethics",
      "Linux Hardening",
    ],
    programmingLanguages: [
      "Python",
      "JavaScript",
      "SQL",
      "C++",
      "C",
      "Bash Scripting",
    ],
    fullStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Django",
      "Flask",
      "Redux Toolkit",
      "JWT & OAuth",
      "RESTful APIs",
      "Tailwind CSS",
    ],
    databases: [
      "Amazon Redshift",
      "MongoDB",
      "MySQL",
      "Firebase",
    ],
    applications: [
      "AWS",
      "Airflow",
      "Docker",
      "Kubernetes / EKS",
      "Git & GitHub",
      "DBeaver",
      "Linux CLI",
      "Postman",
    ],
  },
  contact: {
    email: "Abhishekdshankar@gmail.com",
    phone: "7338006503",
    github: "https://github.com/abhisheksd27",
    linkedin: "https://www.linkedin.com/in/abhishekshankar27/",
    twitter: "",
  },
};

function Portfolio() {
  const [data, setData] = useState(DEFAULT_PORTFOLIO_DATA);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/api/portfolio");
        if (res.data && typeof res.data === "object") {
          setData((prev) => ({
            ...prev,
            ...res.data,
            home: { ...prev.home, ...(res.data.home || {}) },
            about: { ...prev.about, ...(res.data.about || {}) },
            contact: { ...prev.contact, ...(res.data.contact || {}) },
            experience: Array.isArray(res.data.experience) && res.data.experience.length > 0
              ? res.data.experience
              : prev.experience,
            education: Array.isArray(res.data.education) && res.data.education.length > 0
              ? res.data.education
              : prev.education,
            certification: Array.isArray(res.data.certification) && res.data.certification.length > 0
              ? res.data.certification
              : prev.certification,
            projects: Array.isArray(res.data.projects) && res.data.projects.length > 0
              ? res.data.projects
              : prev.projects,
            skills: res.data.skills && Object.keys(res.data.skills).length > 0
              ? { ...prev.skills, ...res.data.skills }
              : prev.skills,
          }));
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

          <div className="hero-actions">
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
              <span className="cred-label">Certification</span>
              <span className="cred-value">Google Cybersecurity</span>
            </div>
            <div className="cred-item">
              <span className="cred-label">Core Stack</span>
              <span className="cred-value">AWS • Spark • Airflow • Redshift</span>
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
              Production implementations across full-stack systems, machine learning, and automation.
            </p>
          </div>

          <div className="projects-grid">
            {projectList.map((project, idx) => {
              const { narrative, tags } = parseProjectSkills(project.description);

              return (
                <article key={idx} className="project-card">
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
                            title="Live Application"
                            aria-label="Live Demo"
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
                          Live App ↗
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
          </div>
        </section>

        {/* ================= CERTIFICATIONS SECTION ================= */}
        <section id="certifications" className="section-wrapper">
          <div className="section-header">
            <span className="section-label">Credentials</span>
            <h2 className="section-heading">Certifications</h2>
            <p className="section-subheading">
              Verified specializations certified by Google in cybersecurity, incident response, and security automation.
            </p>
          </div>

          <div className="cert-list-grid">
            {certList.map((cert, index) => (
              <div key={index} className="cert-item-card">
                <div>
                  <div className="cert-issuer-badge">{cert.issuer || "Google"}</div>
                  <h3 className="cert-name">{cert.name?.trim()}</h3>
                  {cert.skills && <p className="cert-skills-note">{cert.skills}</p>}
                </div>

                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify-link"
                  >
                    Verify Credential ↗
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
                </div>
                <span className="edu-year">{item.year}</span>
              </div>
            ))}
          </div>
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