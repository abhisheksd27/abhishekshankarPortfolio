import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Portfolio() {
  const [data, setData] = useState(null);

  const [showAllProjects, setShowAllProjects] = useState({});
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("api/portfolio");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
      }
    };

    load();
  }, []);

  const normalizedProjects = useMemo(() => {
    const projects = data?.projects ?? {};

    if (Array.isArray(projects)) {
      return { projects };
    }

    if (projects && typeof projects === "object") {
      const normalized = {};
      Object.keys(projects).forEach((key) => {
        normalized[key] = Array.isArray(projects[key]) ? projects[key] : [];
      });
      return normalized;
    }

    return {};
  }, [data]);

  if (!data) return <div className="loading">Loading...</div>;

  const skills = data.skills || {};
  const experience = Array.isArray(data.experience) ? data.experience : [];
  const education = Array.isArray(data.education) ? data.education : [];
  const certification = Array.isArray(data.certification) ? data.certification : [];
  const projectCategories = Object.keys(normalizedProjects);

  const toggleProjectCategory = (cat) => {
    setShowAllProjects((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const toggleSkillGroup = (keyName) => {
    setShowAllSkills((prev) => ({
      ...prev,
      [keyName]: !prev[keyName],
    }));
  };

  const renderSkillGroup = (title, items = [], keyName) => {
    if (!Array.isArray(items) || items.length === 0) return null;

    const visibleItems = showAllSkills[keyName] ? items : items.slice(0, 4);

    return (
      <div className="skill-group" key={title}>
        <h3 className="skill-group-title">{title}</h3>

        <div className="tags">
          {visibleItems.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>

        {items.length > 4 && (
          <div style={{ marginTop: "12px" }}>
            <button
              type="button"
              className="project-btn"
              onClick={() => toggleSkillGroup(keyName)}
            >
              {showAllSkills[keyName] ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    );
  };

  const visibleCertifications = showAllCerts ? certification : certification.slice(0, 4);

  return (
    <div className="home-page">
      <Navbar />

      <div className="birds" aria-hidden="true">
        <div className="bird bird-1"></div>
        <div className="bird bird-2"></div>
        <div className="bird bird-3"></div>
        <div className="bird bird-4"></div>
      </div>

      {/* HOME */}
      <motion.section
        id="home"
        className="home-hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="home-kicker">Data Engineer and Cybersecurity Enthusiast</p>

        <h1 className="home-title">
          Hi, I&apos;m <span>{data.home?.name || "Abhishek Shankar"}</span> 👋
        </h1>

        <p className="home-subtitle">
          {data.about?.desc ||
            "I build modern, scalable web applications with clean UI and strong backend architecture."}
        </p>

        <div className="home-actions">
          <a href="#projects" className="home-btn primary-btn">
            View Projects
          </a>
          <a href="#contact" className="home-btn secondary-btn">
            Contact Me
          </a>
        </div>
      </motion.section>

      {/* EXPERIENCE */}
      <section id="experience" className="page-section">
        <h2 className="section-title">Experience</h2>

        <div className="timeline">
          {experience.length > 0 ? (
            experience.map((item, i) => (
              <motion.div
                className="timeline-item"
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{item.role}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <p className="timeline-duration">{item.duration}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p>No experience added yet.</p>
          )}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="page-section">
        <h2 className="section-title">Education</h2>

        <div className="timeline">
          {education.length > 0 ? (
            education.map((item, i) => (
              <motion.div
                className="timeline-item"
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>{item.degree}</h3>
                  <p className="timeline-company">{item.college}</p>
                  <p className="timeline-duration">{item.year}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p>No education added yet.</p>
          )}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="page-section">
        <h2 className="section-title">Projects</h2>

        {projectCategories.length === 0 ? (
          <p className="projects-empty">No projects added yet.</p>
        ) : (
          projectCategories.map((cat) => {
            const allProjects = normalizedProjects[cat] || [];
            const visibleProjects = showAllProjects[cat]
              ? allProjects
              : allProjects.slice(0, 4);

            return (
              <div key={cat} className="project-category-block">
                <div className="project-category-head">
                  <h3 className="project-category-title">{formatCategory(cat)}</h3>
                </div>

                <div className="project-list">
                  {visibleProjects.map((project, i) => (
                    <motion.article
                      className="project-card"
                      key={`${cat}-${i}`}
                      whileHover={{ y: -6, scale: 1.02 }}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="project-card-top">
                        <h4 className="project-title">
                          {project.title || "Untitled Project"}
                        </h4>
                      </div>

                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title || "Project"}
                          className="project-image"
                        />
                      )}

                      <p className="project-description">
                        {project.description || "No description provided."}
                      </p>

                      <div className="project-actions">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="project-btn"
                          >
                            Live Demo
                          </a>
                        )}

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="project-btn project-btn-outline"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>

                {allProjects.length > 4 && (
                  <div style={{ textAlign: "center", marginTop: "16px" }}>
                    <button
                      type="button"
                      className="project-btn"
                      onClick={() => toggleProjectCategory(cat)}
                    >
                      {showAllProjects[cat] ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* SKILLS */}
      <section id="skills" className="page-section">
        <h2 className="section-title">Skills</h2>

        <div className="skills-groups">
          {renderSkillGroup("Programming Languages", skills.programmingLanguages, "programmingLanguages")}
          {renderSkillGroup("Full Stack", skills.fullStack, "fullStack")}
          {renderSkillGroup("Databases", skills.databases, "databases")}
          {renderSkillGroup("Data Engineering", skills.dataEngineering, "dataEngineering")}
          {renderSkillGroup("Cyber Security", skills.cyberSecurity, "cyberSecurity")}
          {renderSkillGroup("Machine Learning", skills.machineLearning, "machineLearning")}
          {renderSkillGroup("DSA", skills.dsa, "dsa")}
          {renderSkillGroup("Applications", skills.applications, "applications")}
        </div>
      </section>

      {/* CERTIFICATION */}
      <section id="certification" className="page-section">
        <h2 className="section-title">Certification</h2>

        {certification.length > 0 ? (
          <>
            <div className="project-list">
              {visibleCertifications.map((item, i) => (
                <motion.article
                  className="project-card"
                  key={i}
                  whileHover={{ y: -6, scale: 1.02 }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="project-card-top">
                    <h4 className="project-title">{item.name || "Certificate"}</h4>
                  </div>

                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name || "Certificate"}
                      className="project-image"
                    />
                  )}

                  <p className="project-description">
                    {item.issuer || item.year || "Certificate details"}
                  </p>

                  {item.link && (
                    <div className="project-actions">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn"
                      >
                        View Certificate
                      </a>
                    </div>
                  )}
                </motion.article>
              ))}
            </div>

            {certification.length > 4 && (
              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <button
                  type="button"
                  className="project-btn"
                  onClick={() => setShowAllCerts((prev) => !prev)}
                >
                  {showAllCerts ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <p>No certifications added yet.</p>
        )}
      </section>

      {/* CONTACT */}
      <section id="contact" className="page-section contact">
        <h2 className="section-title">Contact</h2>

        <div className="contact-box">
          <div className="contact-left">
            <p className="contact-kicker">Let’s connect</p>
            <h3 className="contact-heading">
              Open to building meaningful products and collaborations.
            </h3>
            <p className="contact-text">
              Whether it’s a project, an opportunity, or a quick conversation, feel free
              to reach out through email or connect with me on the platforms below.
            </p>
          </div>

          <div className="contact-right">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <p className="contact-value">{data.contact?.email || "Not added yet"}</p>
            </div>

            <div className="contact-item">
              <span className="contact-label">Phone</span>
              <p className="contact-value">{data.contact?.phone || "Not added yet"}</p>
            </div>

            <div className="contact-socials">
              {data.contact?.github && (
                <a
                  href={data.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-link"
                >
                  GitHub
                </a>
              )}

              {data.contact?.linkedin && (
                <a
                  href={data.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-link"
                >
                  LinkedIn
                </a>
              )}

              {data.contact?.twitter && (
                <a
                  href={data.contact.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-link"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function formatCategory(value) {
  if (!value) return "";
  return value
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default Portfolio;