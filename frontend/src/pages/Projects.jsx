import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/api/portfolio");
        if (Array.isArray(res.data?.projects)) {
          setProjects(res.data.projects);
        } else if (res.data?.projects && typeof res.data.projects === "object") {
          setProjects(Object.values(res.data.projects).flat());
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    load();
  }, []);

  return (
    <div className="portfolio-root">
      <div className="background-grid" aria-hidden="true" />
      <Navbar />

      <section className="section-wrapper">
        <div className="section-header">
          <span className="section-tag">Featured Work</span>
          <h1 className="section-heading">Technical Projects</h1>
          <p className="section-subheading">
            Enterprise and personal implementations across data engineering, cloud, and full stack.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, idx) => {
            const { narrative, tags } = parseProjectSkills(project.description);

            return (
              <motion.article
                key={idx}
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
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

export default Projects;