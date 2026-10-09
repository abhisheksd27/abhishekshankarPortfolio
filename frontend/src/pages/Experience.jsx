import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";

function Experience() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/api/portfolio").then((res) => {
      setData(res.data.experience || []);
    }).catch((err) => console.error(err));
  }, []);

  return (
    <div className="portfolio-root">
      <div className="background-grid" aria-hidden="true" />
      <Navbar />

      <section className="section-wrapper">
        <div className="section-header">
          <span className="section-tag">Career History</span>
          <h1 className="section-heading">Professional Experience</h1>
          <p className="section-subheading">
            Track record of building data systems, full-stack software, and automated workflows.
          </p>
        </div>

        <div className="timeline-stream">
          {data.map((exp, i) => {
            const techList = Array.isArray(exp.technologies)
              ? exp.technologies
              : typeof exp.technologies === "string"
              ? exp.technologies.split(",").map((t) => t.trim()).filter(Boolean)
              : [];

            return (
              <div className="timeline-card" key={i}>
                <div className={`timeline-marker ${i === 0 ? "active" : ""}`} />
                <div className="timeline-card-inner">
                  <div className="timeline-card-header">
                    <div>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <div className="timeline-meta-row">
                        <span className="timeline-company">{exp.company}</span>
                        {exp.location && (
                          <span className="timeline-location">{exp.location}</span>
                        )}
                      </div>
                    </div>
                    <span className="timeline-period">{exp.duration}</span>
                  </div>

                  <div className="timeline-body">
                    {(exp.description || exp.desc) && (
                      <div>
                        <span className="timeline-block-title">What I Did & Responsibilities</span>
                        <p className="timeline-desc">{exp.description || exp.desc}</p>
                      </div>
                    )}

                    {techList.length > 0 && (
                      <div>
                        <span className="timeline-block-title">Technologies Worked On</span>
                        <div className="timeline-tech-stack">
                          {techList.map((tech, idx) => (
                            <span key={idx} className="timeline-tech-pill">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Experience;