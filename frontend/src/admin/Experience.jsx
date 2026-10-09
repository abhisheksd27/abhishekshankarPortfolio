import { useState, useEffect } from "react";
import axios from "axios";

function Experience() {
  const [experience, setExperience] = useState([]);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const res = await axios.get(`${apiUrl}/api/portfolio`);
        setExperience(Array.isArray(res.data?.experience) ? res.data.experience : []);
      } catch (err) {
        console.error("Failed to load experience:", err);
      }
    };

    loadExperience();
  }, []);

  const resetForm = () => {
    setRole("");
    setCompany("");
    setDuration("");
    setLocation("");
    setDescription("");
    setTechnologies("");
    setEditIndex(null);
    setMsg("");
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setMsg("");

    if (!role.trim() || !company.trim() || !duration.trim()) {
      alert("Please enter role, company, and duration.");
      return;
    }

    try {
      setLoading(true);

      const parsedTech = typeof technologies === "string"
        ? technologies.split(",").map((t) => t.trim()).filter(Boolean)
        : Array.isArray(technologies) ? technologies : [];

      const newEntry = {
        role: role.trim(),
        company: company.trim(),
        duration: duration.trim(),
        location: location.trim(),
        description: description.trim(),
        technologies: parsedTech,
      };

      const updated = [...experience];

      if (editIndex !== null) {
        updated[editIndex] = newEntry;
      } else {
        updated.push(newEntry);
      }

      const apiUrl = import.meta.env.VITE_API_URL || "";
      const res = await axios.post(
        `${apiUrl}/api/portfolio`,
        { experience: updated },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setExperience(Array.isArray(res.data?.experience) ? res.data.experience : updated);
      resetForm();
      setMsg(editIndex !== null ? "Experience updated successfully!" : "Experience added successfully!");
      setTimeout(() => setMsg(""), 3500);
    } catch (err) {
      console.error("Error saving experience:", err);
      alert("Error saving experience. Please ensure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    const item = experience[index];
    if (!item) return;

    setRole(item.role || "");
    setCompany(item.company || "");
    setDuration(item.duration || "");
    setLocation(item.location || "");
    setDescription(item.description || item.desc || "");

    const techString = Array.isArray(item.technologies)
      ? item.technologies.join(", ")
      : typeof item.technologies === "string"
      ? item.technologies
      : "";
    setTechnologies(techString);

    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (index) => {
    try {
      const confirmed = window.confirm("Delete this experience entry?");
      if (!confirmed) return;

      const updated = experience.filter((_, i) => i !== index);

      const apiUrl = import.meta.env.VITE_API_URL || "";
      const res = await axios.post(
        `${apiUrl}/api/portfolio`,
        { experience: updated },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setExperience(Array.isArray(res.data?.experience) ? res.data.experience : updated);

      if (editIndex === index) {
        resetForm();
      }
    } catch (err) {
      console.error("Error deleting experience:", err);
      alert("Error deleting experience entry.");
    }
  };

  return (
    <div style={page}>
      <div style={wrapper}>
        <div style={header}>
          <h1 style={title}>Experience Management</h1>
          <p style={subtitle}>
            Detail your roles, key project responsibilities, and specific technologies worked on.
          </p>
        </div>

        {msg && (
          <div style={successAlert}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>{msg}</span>
          </div>
        )}

        {/* FORM CARD */}
        <div style={formCard}>
          <div style={sectionHeader}>
            <h2 style={sectionTitle}>
              {editIndex !== null ? "Edit Experience Entry" : "Add New Experience"}
            </h2>

            {editIndex !== null && (
              <button onClick={resetForm} style={secondaryButton} type="button">
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSave}>
            <div style={formGrid}>
              <div style={field}>
                <label style={label}>Role / Job Title *</label>
                <input
                  placeholder="e.g. Associate Software Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={input}
                  required
                />
              </div>

              <div style={field}>
                <label style={label}>Company / Organization *</label>
                <input
                  placeholder="e.g. Accenture"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={input}
                  required
                />
              </div>

              <div style={field}>
                <label style={label}>Duration *</label>
                <input
                  placeholder="e.g. Sep 2024 – Present"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  style={input}
                  required
                />
              </div>

              <div style={field}>
                <label style={label}>Location (Optional)</label>
                <input
                  placeholder="e.g. Bengaluru, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={input}
                />
              </div>
            </div>

            {/* WHAT I DID / RESPONSIBILITIES */}
            <div style={{ ...field, marginTop: "16px" }}>
              <label style={label}>
                What I Did During This Experience (Responsibilities & Contributions)
              </label>
              <textarea
                placeholder="Describe your primary responsibilities, key achievements, data pipeline architectures, or projects delivered in this role..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={textarea}
                rows={4}
              />
            </div>

            {/* TECHNOLOGIES WORKED ON */}
            <div style={{ ...field, marginTop: "16px" }}>
              <label style={label}>
                Technologies Worked On (Comma separated)
              </label>
              <input
                placeholder="e.g. Apache Spark, Apache Airflow, Amazon Redshift, AWS, Python, SQL, Docker, Linux"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                style={input}
              />
              <span style={hint}>
                Separate technologies with commas. They will be displayed as badge tags on your portfolio.
              </span>
            </div>

            <div style={actionRow}>
              <button type="submit" style={primaryButton} disabled={loading}>
                {loading
                  ? "Saving..."
                  : editIndex !== null
                  ? "Update Experience Entry"
                  : "Save Experience Entry"}
              </button>
            </div>
          </form>
        </div>

        {/* LIST OF SAVED EXPERIENCES */}
        <div style={listHeader}>
          <h2 style={sectionTitle}>Saved Work Experiences</h2>
          <span style={countBadge}>{experience.length}</span>
        </div>

        {experience.length === 0 ? (
          <div style={emptyState}>
            <p style={emptyText}>No experiences added yet.</p>
          </div>
        ) : (
          <div style={cardGrid}>
            {experience.map((exp, index) => {
              const techList = Array.isArray(exp.technologies)
                ? exp.technologies
                : typeof exp.technologies === "string"
                ? exp.technologies.split(",").map((t) => t.trim()).filter(Boolean)
                : [];

              return (
                <div key={index} style={experienceCard}>
                  <div style={experienceCardBody}>
                    <div style={cardTopRow}>
                      <div>
                        <h3 style={experienceTitle}>{exp.role}</h3>
                        <p style={experienceCompany}>{exp.company}</p>
                        {exp.location && <p style={experienceLocation}>{exp.location}</p>}
                      </div>
                      <span style={durationPill}>{exp.duration}</span>
                    </div>

                    {(exp.description || exp.desc) && (
                      <div style={descBlock}>
                        <strong style={fieldSubtitle}>What I Did:</strong>
                        <p style={experienceDesc}>{exp.description || exp.desc}</p>
                      </div>
                    )}

                    {techList.length > 0 && (
                      <div style={techBlock}>
                        <strong style={fieldSubtitle}>Technologies Worked On:</strong>
                        <div style={techTagContainer}>
                          {techList.map((tech, i) => (
                            <span key={i} style={techBadge}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={buttonRow}>
                      <button
                        type="button"
                        onClick={() => handleEdit(index)}
                        style={editButton}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(index)}
                        style={deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ================= STYLES =================
const page = {
  minHeight: "100vh",
  background: "#080c14",
  color: "#f8fafc",
  padding: "32px 20px 80px",
};

const wrapper = {
  maxWidth: "1100px",
  margin: "0 auto",
};

const header = {
  marginBottom: "28px",
};

const title = {
  fontSize: "2rem",
  fontWeight: 800,
  color: "#f8fafc",
  marginBottom: "8px",
  letterSpacing: "-0.02em",
};

const subtitle = {
  color: "#94a3b8",
  lineHeight: 1.6,
  fontSize: "0.95rem",
};

const successAlert = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "rgba(16, 185, 129, 0.15)",
  border: "1px solid rgba(16, 185, 129, 0.35)",
  color: "#34d399",
  padding: "12px 18px",
  borderRadius: "12px",
  fontSize: "0.92rem",
  fontWeight: 600,
  marginBottom: "20px",
};

const formCard = {
  background: "rgba(17, 24, 39, 0.75)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "18px",
  padding: "26px",
  marginBottom: "36px",
  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.3)",
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  marginBottom: "20px",
};

const sectionTitle = {
  fontSize: "1.25rem",
  fontWeight: 700,
  color: "#f8fafc",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: "16px",
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const label = {
  fontSize: "0.88rem",
  fontWeight: 600,
  color: "#cbd5e1",
};

const hint = {
  fontSize: "0.78rem",
  color: "#94a3b8",
  marginTop: "2px",
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  fontSize: "0.95rem",
  outline: "none",
  background: "rgba(15, 23, 42, 0.8)",
  color: "#f8fafc",
};

const textarea = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  fontSize: "0.95rem",
  outline: "none",
  background: "rgba(15, 23, 42, 0.8)",
  color: "#f8fafc",
  fontFamily: "inherit",
  lineHeight: 1.6,
  resize: "vertical",
};

const actionRow = {
  marginTop: "22px",
  display: "flex",
  gap: "12px",
};

const primaryButton = {
  padding: "12px 24px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
  color: "#fff",
  fontWeight: 600,
  fontSize: "0.92rem",
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
};

const secondaryButton = {
  padding: "8px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "#cbd5e1",
  fontWeight: 500,
  fontSize: "0.85rem",
  cursor: "pointer",
};

const listHeader = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "20px",
};

const countBadge = {
  background: "rgba(59, 130, 246, 0.15)",
  color: "#93c5fd",
  border: "1px solid rgba(59, 130, 246, 0.3)",
  padding: "2px 10px",
  borderRadius: "999px",
  fontSize: "0.82rem",
  fontWeight: 700,
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "18px",
};

const experienceCard = {
  background: "rgba(17, 24, 39, 0.65)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "16px",
  padding: "22px",
};

const experienceCardBody = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const cardTopRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "16px",
  flexWrap: "wrap",
};

const experienceTitle = {
  fontSize: "1.2rem",
  fontWeight: 700,
  color: "#f8fafc",
};

const experienceCompany = {
  fontSize: "0.95rem",
  color: "#60a5fa",
  fontWeight: 600,
  marginTop: "2px",
};

const experienceLocation = {
  fontSize: "0.82rem",
  color: "#94a3b8",
  marginTop: "2px",
};

const durationPill = {
  fontSize: "0.82rem",
  fontWeight: 600,
  color: "#93c5fd",
  background: "rgba(59, 130, 246, 0.1)",
  border: "1px solid rgba(59, 130, 246, 0.2)",
  padding: "4px 12px",
  borderRadius: "999px",
  whiteSpace: "nowrap",
};

const descBlock = {
  marginTop: "4px",
};

const fieldSubtitle = {
  display: "block",
  fontSize: "0.82rem",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#94a3b8",
  marginBottom: "4px",
};

const experienceDesc = {
  color: "#cbd5e1",
  fontSize: "0.92rem",
  lineHeight: 1.6,
};

const techBlock = {
  marginTop: "4px",
};

const techTagContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "6px",
  marginTop: "6px",
};

const techBadge = {
  fontSize: "0.78rem",
  fontWeight: 500,
  color: "#93c5fd",
  background: "rgba(59, 130, 246, 0.12)",
  border: "1px solid rgba(59, 130, 246, 0.25)",
  padding: "3px 10px",
  borderRadius: "6px",
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  marginTop: "8px",
};

const editButton = {
  padding: "7px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "#f8fafc",
  fontSize: "0.84rem",
  fontWeight: 600,
  cursor: "pointer",
};

const deleteButton = {
  padding: "7px 16px",
  borderRadius: "8px",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  background: "rgba(239, 68, 68, 0.1)",
  color: "#fca5a5",
  fontSize: "0.84rem",
  fontWeight: 600,
  cursor: "pointer",
};

const emptyState = {
  padding: "40px",
  textAlign: "center",
  background: "rgba(17, 24, 39, 0.4)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.06)",
};

const emptyText = {
  color: "#94a3b8",
};

export default Experience;