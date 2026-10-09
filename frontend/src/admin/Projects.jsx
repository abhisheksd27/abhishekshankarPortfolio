import { useState, useEffect } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    github: ""
  });
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/portfolio`);
        setProjects(Array.isArray(res.data?.projects) ? res.data.projects : []);
      } catch (err) {
        console.error("Error loading projects:", err);
        setProjects([]);
      }
    };

    load();
  }, [API_URL]);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      link: "",
      github: ""
    });
    setEditIndex(null);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      if (!form.title.trim() || !form.description.trim()) {
        alert("Please enter project title and description");
        return;
      }

      setLoading(true);

      const updated = [...projects];

      if (editIndex !== null) {
        updated[editIndex] = form;
      } else {
        updated.push(form);
      }

      const res = await axios.post(
        `${API_URL}/api/portfolio`,
        { projects: updated },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setProjects(Array.isArray(res.data?.projects) ? res.data.projects : []);
      resetForm();
      setMsg(editIndex !== null ? "Project updated successfully." : "Project added successfully.");
      setTimeout(() => setMsg(""), 3500);
    } catch (err) {
      console.error(err);
      alert("Error saving project. Please verify you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    setForm(projects[index]);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (index) => {
    try {
      const confirmed = window.confirm("Delete this project?");
      if (!confirmed) return;

      const updated = projects.filter((_, i) => i !== index);

      const res = await axios.post(
        `${API_URL}/api/portfolio`,
        { projects: updated },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setProjects(Array.isArray(res.data?.projects) ? res.data.projects : []);

      if (editIndex === index) {
        resetForm();
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete project");
    }
  };

  return (
    <div style={page}>
      <div style={wrapper}>
        <div style={header}>
          <h1 style={title}>Projects</h1>
          <p style={subtitle}>
            Manage your engineering projects, implementation architecture, and code repository links.
          </p>
        </div>

        {msg && <div style={successAlert}>{msg}</div>}

        <div style={formCard}>
          <div style={sectionHeader}>
            <h2 style={sectionTitle}>
              {editIndex !== null ? "Edit Project" : "Add Project"}
            </h2>

            {editIndex !== null && (
              <button onClick={resetForm} style={secondaryButton}>
                Cancel Edit
              </button>
            )}
          </div>

          <div style={formGrid}>
            <div style={{ ...field, gridColumn: "1 / -1" }}>
              <label style={label}>Project Title</label>
              <input
                placeholder="e.g. Distributed Log Analytics Pipeline"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={input}
              />
            </div>

            <div style={{ ...field, gridColumn: "1 / -1" }}>
              <label style={label}>Description & Technologies</label>
              <textarea
                placeholder="Architectural overview and impact. Include technologies at the end (e.g. Skills: Python, Docker, Spark)..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                style={textarea}
              />
              <span style={hint}>Tip: End with &ldquo;Skills: Tech1, Tech2&rdquo; to automatically display monospace tags on the site.</span>
            </div>

            <div style={field}>
              <label style={label}>Live Application URL (Optional)</label>
              <input
                placeholder="https://your-live-deployment.com"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                style={input}
              />
            </div>

            <div style={field}>
              <label style={label}>GitHub Repository URL</label>
              <input
                placeholder="https://github.com/abhisheksd27/repository"
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                style={input}
              />
            </div>
          </div>

          <div style={actionRow}>
            <button onClick={handleSave} style={primaryButton} disabled={loading}>
              {loading
                ? "Saving..."
                : editIndex !== null
                ? "Update Project"
                : "Add Project"}
            </button>
          </div>
        </div>

        <div style={listHeader}>
          <h2 style={sectionTitle}>Published Projects</h2>
          <span style={countBadge}>{projects.length}</span>
        </div>

        {projects.length === 0 ? (
          <div style={emptyState}>
            <p style={emptyText}>No projects recorded yet.</p>
          </div>
        ) : (
          <div style={cardGrid}>
            {projects.map((project, index) => (
              <div key={index} style={projectCard}>
                <div style={projectCardBody}>
                  <div>
                    <h3 style={projectTitle}>{project.title}</h3>
                    <p style={projectDescription}>{project.description}</p>
                  </div>

                  <div style={linkRow}>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        style={link}
                      >
                        Live Demo ↗
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        style={link}
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>

                  <div style={buttonRow}>
                    <button onClick={() => handleEdit(index)} style={editButton}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(index)} style={deleteButton}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ================= STYLES =================
const page = {
  minHeight: "100vh",
  background: "#090a0f",
  color: "#f4f4f5",
  padding: "32px 20px 80px",
};

const wrapper = {
  maxWidth: "960px",
  margin: "0 auto",
};

const header = {
  marginBottom: "24px",
};

const title = {
  fontSize: "1.5rem",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: "6px",
  letterSpacing: "-0.01em",
};

const subtitle = {
  color: "#a1a1aa",
  lineHeight: 1.5,
  fontSize: "0.88rem",
};

const successAlert = {
  background: "#13231a",
  border: "1px solid #1c3b29",
  color: "#4ade80",
  padding: "10px 16px",
  borderRadius: "6px",
  fontSize: "0.88rem",
  fontWeight: 500,
  marginBottom: "20px",
};

const formCard = {
  background: "#121318",
  border: "1px solid #20222b",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "32px",
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  marginBottom: "18px",
};

const sectionTitle = {
  fontSize: "1.05rem",
  fontWeight: 600,
  color: "#ffffff",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const label = {
  fontSize: "0.82rem",
  fontWeight: 500,
  color: "#d4d4d8",
};

const hint = {
  fontSize: "0.75rem",
  color: "#71717a",
  marginTop: "2px",
};

const input = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #282a35",
  background: "#181920",
  color: "#f4f4f5",
  fontSize: "0.9rem",
  outline: "none",
};

const textarea = {
  width: "100%",
  minHeight: "110px",
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #282a35",
  background: "#181920",
  color: "#f4f4f5",
  fontSize: "0.9rem",
  outline: "none",
  resize: "vertical",
  fontFamily: "inherit",
  lineHeight: 1.5,
};

const actionRow = {
  marginTop: "18px",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const primaryButton = {
  padding: "10px 20px",
  borderRadius: "6px",
  border: "none",
  background: "#ffffff",
  color: "#090a0f",
  fontWeight: 600,
  fontSize: "0.88rem",
  cursor: "pointer",
};

const secondaryButton = {
  padding: "8px 14px",
  borderRadius: "6px",
  border: "1px solid #282a35",
  background: "#181920",
  color: "#d4d4d8",
  fontWeight: 500,
  fontSize: "0.82rem",
  cursor: "pointer",
};

const listHeader = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "18px",
};

const countBadge = {
  background: "#20222b",
  color: "#d4d4d8",
  border: "1px solid #282a35",
  padding: "2px 8px",
  borderRadius: "4px",
  fontSize: "0.78rem",
  fontWeight: 600,
};

const emptyState = {
  background: "#121318",
  border: "1px dashed #20222b",
  borderRadius: "8px",
  padding: "36px",
  textAlign: "center",
};

const emptyText = {
  color: "#71717a",
  fontSize: "0.9rem",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "14px",
};

const projectCard = {
  background: "#121318",
  border: "1px solid #20222b",
  borderRadius: "8px",
  padding: "20px",
};

const projectCardBody = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const projectTitle = {
  fontSize: "1.05rem",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: "4px",
};

const projectDescription = {
  color: "#a1a1aa",
  lineHeight: 1.6,
  fontSize: "0.88rem",
  whiteSpace: "pre-line",
};

const linkRow = {
  display: "flex",
  gap: "14px",
  flexWrap: "wrap",
};

const link = {
  color: "#93c5fd",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "0.85rem",
};

const buttonRow = {
  display: "flex",
  gap: "8px",
  marginTop: "4px",
};

const editButton = {
  padding: "6px 14px",
  borderRadius: "6px",
  border: "1px solid #282a35",
  background: "#181920",
  color: "#f4f4f5",
  fontSize: "0.82rem",
  fontWeight: 500,
  cursor: "pointer",
};

const deleteButton = {
  padding: "6px 14px",
  borderRadius: "6px",
  border: "1px solid #2b1f22",
  background: "#181214",
  color: "#f87171",
  fontSize: "0.82rem",
  fontWeight: 500,
  cursor: "pointer",
};

export default Projects;