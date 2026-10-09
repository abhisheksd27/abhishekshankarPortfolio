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
  display: "flex",
  alignItems: "center",
  gap: "8px",
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
  fontSize: "0.9rem",
  outline: "none",
  background: "#181920",
  color: "#f4f4f5",
};

const textarea = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #282a35",
  fontSize: "0.9rem",
  outline: "none",
  background: "#181920",
  color: "#f4f4f5",
  fontFamily: "inherit",
  lineHeight: 1.5,
  resize: "vertical",
};

const actionRow = {
  marginTop: "18px",
  display: "flex",
  gap: "10px",
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

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "14px",
};

const experienceCard = {
  background: "#121318",
  border: "1px solid #20222b",
  borderRadius: "8px",
  padding: "20px",
};

const experienceCardBody = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const cardTopRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "14px",
  flexWrap: "wrap",
};

const experienceTitle = {
  fontSize: "1.05rem",
  fontWeight: 600,
  color: "#ffffff",
};

const experienceCompany = {
  fontSize: "0.9rem",
  color: "#ffffff",
  fontWeight: 500,
  marginTop: "2px",
};

const experienceLocation = {
  fontSize: "0.8rem",
  color: "#71717a",
  marginTop: "2px",
};

const durationPill = {
  fontSize: "0.78rem",
  fontFamily: "var(--font-mono)",
  color: "#a1a1aa",
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid #20222b",
  padding: "3px 8px",
  borderRadius: "4px",
  whiteSpace: "nowrap",
};

const descBlock = {
  marginTop: "4px",
};

const fieldSubtitle = {
  display: "block",
  fontSize: "0.75rem",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#71717a",
  marginBottom: "4px",
};

const experienceDesc = {
  color: "#a1a1aa",
  fontSize: "0.9rem",
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
  fontSize: "0.75rem",
  fontFamily: "var(--font-mono)",
  color: "#d4d4d8",
  background: "#181920",
  border: "1px solid #282a35",
  padding: "3px 8px",
  borderRadius: "4px",
};

const buttonRow = {
  display: "flex",
  gap: "8px",
  marginTop: "8px",
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

const emptyState = {
  padding: "36px",
  textAlign: "center",
  background: "#121318",
  borderRadius: "8px",
  border: "1px dashed #20222b",
};

const emptyText = {
  color: "#71717a",
  fontSize: "0.9rem",
};

export default Experience;