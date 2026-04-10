import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Projects() {
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/portfolio");
        setProjects(res.data?.projects ?? {});
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects({});
      }
    };

    load();
  }, []);

  const normalizedProjects = useMemo(() => {
    if (Array.isArray(projects)) {
      return { Projects: projects };
    }

    if (projects && typeof projects === "object") {
      const normalized = {};

      Object.keys(projects).forEach((key) => {
        normalized[key] = Array.isArray(projects[key]) ? projects[key] : [];
      });

      return normalized;
    }

    return {};
  }, [projects]);

  const categories = Object.keys(normalizedProjects);

  return (
    <div className="home-page">
      <Navbar />

      <div className="birds" aria-hidden="true">
        <div className="bird bird-1"></div>
        <div className="bird bird-2"></div>
        <div className="bird bird-3"></div>
        <div className="bird bird-4"></div>
      </div>

      <section className="page-section projects-page">
        <motion.h1
          className="projects-main-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
     
        </motion.h1>

        {categories.length === 0 ? (
          <p className="projects-empty">No projects added yet.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat} className="project-category-block">
              <div className="project-category-head">
                <h2 className="project-category-title">
                  {formatCategory(cat)}
                </h2>
              </div>

              <div className="project-list">
                {normalizedProjects[cat].length === 0 ? (
                  <p className="projects-empty">No projects in this section.</p>
                ) : (
                  normalizedProjects[cat].map((project, i) => (
                    <motion.article
                      className="project-card"
                      key={`${cat}-${i}`}
                      whileHover={{ y: -6, scale: 1.02 }}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="project-card-top">
                        <h3 className="project-title">
                          {project.title || "Untitled Project"}
                        </h3>
                      </div>

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
                  ))
                )}
              </div>
            </div>
          ))
        )}
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

export default Projects;