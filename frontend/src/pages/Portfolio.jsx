import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

// Comprehensive verified fallback data to guarantee 0s load and offline resilience
const DEFAULT_PORTFOLIO_DATA = {
  home: {
    name: "Abhishek Shankar",
    role: "Associate Software Engineer at Accenture",
    tagline: "Data Engineer & Cybersecurity Specialist",
  },
  about: {
    desc: "I’m an Associate Software Engineer at Accenture, working as a Data Engineer based in Bangalore. I work with modern data technologies to process, transform, and analyze large datasets, turning raw data into meaningful insights and scalable workflows. Alongside my work, I actively pursue Cybersecurity and secure system architecture.",
  },
  experience: [
    {
      role: "Associate Software Engineer",
      company: "Accenture",
      duration: "Sep 2024 – Present",
      location: "Bengaluru, India",
      highlight: "Current Role",
      description: "Working as a Data Engineer building modern data workflows to process, transform, and analyze large enterprise datasets. Developing resilient ETL/ELT pipelines, optimizing queries, and automating data orchestration across cloud environments.",
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
      highlight: "Independent",
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
      highlight: "Internship",
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
      highlight: "Internship",
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
      status: "Graduated",
    },
    {
      degree: "Pre - University (PCMB)",
      college: "R N Shetty PU College Kundapura",
      year: "2018 – 2020",
      status: "Completed",
    },
  ],
  certification: [
    {
      name: "Google Cybersecurity Specialization",
      issuer: "Google",
      link: "https://coursera.org/share/9685d5eda28b8a2632145987c9675a4b",
      skills: "Threat Intelligence, Network Defense, SIEM, Python, Linux",
    },
    {
      name: "Automate Cybersecurity Tasks with Python",
      issuer: "Google",
      link: "https://www.coursera.org/account/accomplishments/verify/WOE75EBSP6JU",
      skills: "Python Scripting, Log Parsing, Security Automation",
    },
    {
      name: "Sound the Alarm: Detection and Response",
      issuer: "Google",
      link: "https://www.coursera.org/account/accomplishments/verify/Y8PEGJKW9H5Z",
      skills: "Incident Response, Packet Analysis, IDS/IPS, SIEM",
    },
    {
      name: "Assets, Threats, and Vulnerabilities",
      issuer: "Google",
      link: "https://www.coursera.org/account/accomplishments/verify/7308ZOCM7TNC",
      skills: "Risk Assessment, Vulnerability Auditing, Cryptography",
    },
    {
      name: "Tools of the Trade: Linux and SQL",
      issuer: "Google",
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
        // Fallback data is already initialized gracefully
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
        setTimeout(() => setCopiedEmail(false), 2200);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2200);
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
      <div className="background-grid" aria-hidden="true" />

      {/* Modern Executive Navigation */}
      <Navbar />

      <main>
        {/* ================= HERO SECTION ================= */}
        <section id="about" className="hero-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-status">
              <span className="status-indicator" />
              <span>Associate Software Engineer @ Accenture</span>
            </div>

            <h1 className="hero-headline">
              Hi, I&apos;m <span className="text-accent">{data.home?.name || "Abhishek Shankar"}</span>.
              <br />
              <span className="text-gradient">
                Building Resilient Data Pipelines & Secure Systems.
              </span>
            </h1>

            <p className="hero-bio">
              {data.about?.desc ||
                "Associate Software Engineer at Accenture working in big data workflows, ETL/ELT pipelines, and cloud computing. Passionate about turning complex datasets into scalable intelligence while actively applying cybersecurity defense standards."}
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                View Selected Work
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>

              <a href="#contact" className="btn-secondary">
                Get In Touch
              </a>

              <button
                type="button"
                onClick={() => copyToClipboard(data.contact?.email || "Abhishekdshankar@gmail.com", "email")}
                className="btn-secondary"
                title="Click to copy email"
              >
                {copiedEmail ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>Email Copied!</span>
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                    </svg>
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick architectural capability summary */}
            <div className="hero-highlights-strip">
              <div className="highlight-box">
                <span className="highlight-label">Primary Specialization</span>
                <span className="highlight-value">Data Engineering & Pipelines</span>
              </div>
              <div className="highlight-box">
                <span className="highlight-label">Current Organization</span>
                <span className="highlight-value">Accenture (Bangalore)</span>
              </div>
              <div className="highlight-box">
                <span className="highlight-label">Verified Certifications</span>
                <span className="highlight-value">Google Cybersecurity Professional</span>
              </div>
              <div className="highlight-box">
                <span className="highlight-label">Core Infrastructure</span>
                <span className="highlight-value">AWS • Spark • Airflow • Redshift</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ================= EXPERIENCE SECTION ================= */}
        <section id="experience" className="section-wrapper">
          <div className="section-header">
            <span className="section-tag">Career History</span>
            <h2 className="section-heading">Professional Experience</h2>
            <p className="section-subheading">
              Track record of building data systems, full-stack software, and automated workflows.
            </p>
          </div>

          <div className="timeline-stream">
            {experienceList.map((item, index) => {
              const isCurrent = index === 0;
              return (
                <motion.div
                  key={index}
                  className="timeline-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className={`timeline-marker ${isCurrent ? "active" : ""}`} />
                  <div className="timeline-card-inner">
                    <div className="timeline-card-header">
                      <div>
                        <h3 className="timeline-role">{item.role}</h3>
                        <div className="timeline-meta-row">
                          <span className="timeline-company">{item.company}</span>
                          {item.location && (
                            <span className="timeline-location">
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                              </svg>
                              {item.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="timeline-period">{item.duration}</span>
                    </div>

                    <div className="timeline-body">
                      {(item.description || item.desc) && (
                        <div>
                          <span className="timeline-block-title">What I Did & Responsibilities</span>
                          <p className="timeline-desc">{item.description || item.desc}</p>
                        </div>
                      )}

                      {getTechList(item.technologies).length > 0 && (
                        <div>
                          <span className="timeline-block-title">Technologies Worked On</span>
                          <div className="timeline-tech-stack">
                            {getTechList(item.technologies).map((tech, i) => (
                              <span key={i} className="timeline-tech-pill">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ================= PROJECTS SECTION ================= */}
        <section id="projects" className="section-wrapper">
          <div className="section-header">
            <span className="section-tag">Featured Work</span>
            <h2 className="section-heading">Technical Projects</h2>
            <p className="section-subheading">
              Production-tested implementations across data engineering, full-stack development, and intelligent systems.
            </p>
          </div>

          <div className="projects-grid">
            {projectList.map((project, idx) => {
              const { narrative, tags } = parseProjectSkills(project.description);

              return (
                <motion.article
                  key={idx}
                  className="project-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <div>
                    <div className="project-card-top">
                      <span className="project-category-chip">Project 0{idx + 1}</span>
                      <div className="project-links-corner">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon-link"
                            title="View source on GitHub"
                            aria-label="GitHub Repository"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="icon-link"
                            title="Visit Live Application"
                            aria-label="Live Demo"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{narrative}</p>
                  </div>

                  <div>
                    {tags.length > 0 && (
                      <div className="project-tech-stack">
                        {tags.map((t, i) => (
                          <span key={i} className="tech-tag">
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
                          className="project-btn project-btn-primary"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-btn project-btn-outline"
                        >
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* ================= SKILLS SECTION ================= */}
        <section id="skills" className="section-wrapper">
          <div className="section-header">
            <span className="section-tag">Technical Competencies</span>
            <h2 className="section-heading">Skills & Architecture</h2>
            <p className="section-subheading">
              Proven proficiency across modern data processing engines, defense frameworks, and full-stack software.
            </p>
          </div>

          <div className="skills-container">
            {renderSkillCategory(
              "Data Engineering & Cloud",
              skillsMap.dataEngineering || DEFAULT_PORTFOLIO_DATA.skills.dataEngineering,
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            )}

            {renderSkillCategory(
              "Cybersecurity & Defense",
              skillsMap.cyberSecurity || DEFAULT_PORTFOLIO_DATA.skills.cyberSecurity,
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            )}

            {renderSkillCategory(
              "Programming Languages",
              skillsMap.programmingLanguages || DEFAULT_PORTFOLIO_DATA.skills.programmingLanguages,
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            )}

            {renderSkillCategory(
              "Full Stack & Web Architecture",
              skillsMap.fullStack || DEFAULT_PORTFOLIO_DATA.skills.fullStack,
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
            )}

            {renderSkillCategory(
              "Databases & Storage",
              skillsMap.databases || DEFAULT_PORTFOLIO_DATA.skills.databases,
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>
            )}

            {renderSkillCategory(
              "Infrastructure & Dev Tools",
              skillsMap.applications || DEFAULT_PORTFOLIO_DATA.skills.applications,
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            )}
          </div>
        </section>

        {/* ================= CERTIFICATIONS SECTION ================= */}
        <section id="certification" className="section-wrapper">
          <div className="section-header">
            <span className="section-tag">Verified Credentials</span>
            <h2 className="section-heading">Professional Certifications</h2>
            <p className="section-subheading">
              Certified specializations validated by Google and Coursera in cybersecurity analytics, automation, and threat defense.
            </p>
          </div>

          <div className="cert-grid">
            {certList.map((cert, index) => (
              <motion.div
                key={index}
                className="cert-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div>
                  <div className="cert-badge-row">
                    <span className="cert-issuer">{cert.issuer || "Google"}</span>
                    <span className="cert-verified">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Verified
                    </span>
                  </div>

                  <h3 className="cert-title">{cert.name?.trim()}</h3>
                  {cert.skills && <p className="timeline-desc">{cert.skills}</p>}
                </div>

                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-btn"
                  >
                    Verify Credential
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= EDUCATION SECTION ================= */}
        <section id="education" className="section-wrapper">
          <div className="section-header">
            <span className="section-tag">Academic Background</span>
            <h2 className="section-heading">Education</h2>
            <p className="section-subheading">
              Foundational degree in engineering and computer science principles.
            </p>
          </div>

          <div className="timeline-stream">
            {educationList.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="timeline-marker" />
                <div className="timeline-card-inner">
                  <div className="timeline-card-header">
                    <div>
                      <h3 className="timeline-role">{item.degree}</h3>
                      <p className="timeline-company">{item.college}</p>
                    </div>
                    <span className="timeline-period">{item.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}
        <section id="contact" className="section-wrapper">
          <div className="section-header">
            <span className="section-tag">Get in Touch</span>
            <h2 className="section-heading">Connect & Collaborate</h2>
            <p className="section-subheading">
              Always open to discussing data engineering challenges, distributed architecture, and technical collaborations.
            </p>
          </div>

          <div className="contact-card-executive">
            <div className="contact-left">
              <h3>Let&apos;s build impactful engineering solutions together.</h3>
              <p>
                Whether you have an inquiry regarding data pipeline architectures, distributed computing systems, or would like to connect professionally, feel free to reach out directly.
              </p>

              <div className="social-links-bar">
                {data.contact?.github && (
                  <a
                    href={data.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="GitHub Profile"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    GitHub
                  </a>
                )}

                {data.contact?.linkedin && (
                  <a
                    href={data.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    aria-label="LinkedIn Profile"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.66-.74 1.66-1.66 0-.92-.74-1.66-1.66-1.66-.92 0-1.66.74-1.66 1.66 0 .92.74 1.66 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            <div className="contact-channels">
              <div className="channel-card">
                <div className="channel-meta">
                  <span className="channel-type">Direct Email</span>
                  <a
                    href={`mailto:${data.contact?.email || "Abhishekdshankar@gmail.com"}`}
                    className="channel-value"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {data.contact?.email || "Abhishekdshankar@gmail.com"}
                  </a>
                </div>
                <button
                  type="button"
                  className="channel-action-btn"
                  onClick={() => copyToClipboard(data.contact?.email || "Abhishekdshankar@gmail.com", "email")}
                >
                  {copiedEmail ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="channel-card">
                <div className="channel-meta">
                  <span className="channel-type">Phone</span>
                  <a
                    href={`tel:${data.contact?.phone || "7338006503"}`}
                    className="channel-value"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    +91 {data.contact?.phone || "7338006503"}
                  </a>
                </div>
                <button
                  type="button"
                  className="channel-action-btn"
                  onClick={() => copyToClipboard(data.contact?.phone || "7338006503", "phone")}
                >
                  {copiedPhone ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="channel-card">
                <div className="channel-meta">
                  <span className="channel-type">Location & Timezone</span>
                  <span className="channel-value">Bangalore, India (IST / UTC+5:30)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= PROFESSIONAL FOOTER ================= */}
      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-copy">
            © {new Date().getFullYear()} Abhishek Shankar. All rights reserved.
          </p>

          <div className="footer-links">
            <a href="#about" className="footer-link">About</a>
            <a href="#experience" className="footer-link">Experience</a>
            <a href="#projects" className="footer-link">Projects</a>
            <a href="#skills" className="footer-link">Skills</a>
            <a href="#contact" className="footer-link">Contact</a>
            <a href="/admin/login" className="footer-link" style={{ opacity: 0.6 }}>Admin</a>
          </div>

          <button
            type="button"
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}

// Helper to render skills category
function renderSkillCategory(title, items = [], icon) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="skill-category-card" key={title}>
      <div className="skill-category-header">
        <div className="skill-icon-wrap">{icon}</div>
        <h3 className="skill-category-title">{title}</h3>
      </div>
      <div className="skill-pills-wrap">
        {items.map((item, idx) => (
          <span key={idx} className="skill-pill">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// Helper to clean project descriptions and extract skills pills
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