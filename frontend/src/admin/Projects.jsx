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

  const token = localStorage.getItem("token");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio`);
        setProjects(Array.isArray(res.data?.projects) ? res.data.projects : []);
      } catch (err) {
        console.error("Error loading projects:", err);
        setProjects([]);
      }
    };

    load();
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      link: "",
      github: ""
    });
    setEditIndex(null);
  };

  const handleSave = async () => {
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
        `${import.meta.env.VITE_API_URL}/api/portfolio`,
        { projects: updated },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setProjects(Array.isArray(res.data?.projects) ? res.data.projects : []);
      resetForm();

      alert(editIndex !== null ? "Project updated successfully" : "Project added successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving project");
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
        `${import.meta.env.VITE_API_URL}/api/portfolio`,
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
            Add, edit, and manage your portfolio projects, descriptions, and links.
          </p>
        </div>

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
                placeholder="Propertease"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={input}
              />
            </div>

            <div style={{ ...field, gridColumn: "1 / -1" }}>
              <label style={label}>Description</label>
              <textarea
                placeholder="Briefly describe the project, what it does, and your role."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                style={textarea}
              />
            </div>

            <div style={field}>
              <label style={label}>Live Link</label>
              <input
                placeholder="https://your-live-site.com"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                style={input}
              />
            </div>

            <div style={field}>
              <label style={label}>GitHub Link</label>
              <input
                placeholder="https://github.com/username/project"
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
          <h2 style={sectionTitle}>Saved Projects</h2>
          <span style={countBadge}>{projects.length}</span>
        </div>

        {projects.length === 0 ? (
          <div style={emptyState}>
            <p style={emptyText}>No projects added yet.</p>
          </div>
        ) : (
          <div style={cardGrid}>
            {projects.map((project, index) => (
              <div key={index} style={projectCard}>
                <div style={projectCardBody}>
                  <h3 style={projectTitle}>{project.title}</h3>
                  <p style={projectDescription}>{project.description}</p>

                  <div style={linkRow}>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        style={link}
                      >
                        Live Demo
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        style={link}
                      >
                        GitHub
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

const page = {
  minHeight: "100vh",
  background: "#080c14",
  color: "#f8fafc",
  padding: "32px 20px 80px"
};

const wrapper = {
  maxWidth: "1100px",
  margin: "0 auto"
};

const header = {
  marginBottom: "28px"
};

const title = {
  fontSize: "2rem",
  fontWeight: 800,
  color: "#f8fafc",
  marginBottom: "8px",
  letterSpacing: "-0.02em"
};

const subtitle = {
  color: "#94a3b8",
  lineHeight: 1.6,
  fontSize: "0.95rem"
};

const formCard = {
  background: "rgba(17, 24, 39, 0.75)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  padding: "24px",
  marginBottom: "32px",
  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.3)"
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  marginBottom: "20px"
};

const sectionTitle = {
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "#f8fafc"
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "16px"
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const label = {
  fontSize: "0.88rem",
  fontWeight: 600,
  color: "#cbd5e1"
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  background: "rgba(15, 23, 42, 0.8)",
  color: "#f8fafc",
  fontSize: "0.95rem",
  outline: "none"
};

const textarea = {
  width: "100%",
  minHeight: "120px",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  background: "rgba(15, 23, 42, 0.8)",
  color: "#f8fafc",
  fontSize: "0.95rem",
  outline: "none",
  resize: "vertical",
  fontFamily: "inherit",
  lineHeight: 1.6
};

const actionRow = {
  marginTop: "20px",
  display: "flex",
  gap: "12px",
  flexWrap: "wrap"
};

const primaryButton = {
  padding: "12px 22px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)"
};

const secondaryButton = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "#cbd5e1",
  fontWeight: 500,
  cursor: "pointer"
};

const listHeader = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "20px"
};

const countBadge = {
  background: "rgba(59, 130, 246, 0.15)",
  color: "#93c5fd",
  border: "1px solid rgba(59, 130, 246, 0.3)",
  borderRadius: "999px",
  padding: "3px 10px",
  fontSize: "0.85rem",
  fontWeight: 700
};

const emptyState = {
  background: "rgba(17, 24, 39, 0.4)",
  border: "1px dashed rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  padding: "36px",
  textAlign: "center"
};

const emptyText = {
  color: "#94a3b8"
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "18px"
};

const projectCard = {
  background: "rgba(17, 24, 39, 0.65)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "16px",
  overflow: "hidden"
};

const projectCardBody = {
  padding: "20px"
};

const projectTitle = {
  fontSize: "1.15rem",
  fontWeight: 700,
  color: "#f8fafc",
  marginBottom: "10px"
};

const projectDescription = {
  color: "#cbd5e1",
  lineHeight: 1.65,
  marginBottom: "14px",
  fontSize: "0.92rem"
};

const linkRow = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginBottom: "16px"
};

const link = {
  color: "#60a5fa",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.88rem"
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const editButton = {
  padding: "8px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "#f8fafc",
  fontWeight: 600,
  cursor: "pointer"
};

const deleteButton = {
  padding: "8px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  background: "rgba(239, 68, 68, 0.12)",
  color: "#fca5a5",
  fontWeight: 600,
  cursor: "pointer"
};

export default Projects;