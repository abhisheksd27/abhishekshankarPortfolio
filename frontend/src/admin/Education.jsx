import { useState, useEffect } from "react";
import axios from "axios";

function Education() {
  const [education, setEducation] = useState([]);
  const [degree, setDegree] = useState("");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadEducation = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio`);
        setEducation(res.data.education || []);
      } catch (err) {
        console.error("Failed to load education:", err);
      }
    };

    loadEducation();
  }, []);

  const resetForm = () => {
    setDegree("");
    setCollege("");
    setYear("");
    setEditIndex(null);
  };

  const handleSave = async () => {
    try {
      if (!degree.trim() || !college.trim() || !year.trim()) {
        alert("Please fill in degree, college, and year");
        return;
      }

      setLoading(true);

      const updated = [...education];

      if (editIndex !== null) {
        updated[editIndex] = { degree, college, year };
      } else {
        updated.push({ degree, college, year });
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/portfolio`,
        { education: updated },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setEducation(res.data.education || []);
      resetForm();

      alert(editIndex !== null ? "Education updated successfully" : "Education added successfully");
    } catch (err) {
      console.error("Error saving education:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    setDegree(education[index].degree || "");
    setCollege(education[index].college || "");
    setYear(education[index].year || "");
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (index) => {
    try {
      const confirmed = window.confirm("Delete this education entry?");
      if (!confirmed) return;

      const updated = education.filter((_, i) => i !== index);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/portfolio`,
        { education: updated },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setEducation(res.data.education || []);

      if (editIndex === index) {
        resetForm();
      }
    } catch (err) {
      console.error("Error deleting education:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div style={page}>
      <div style={wrapper}>
        <div style={header}>
          <h1 style={title}>Education</h1>
          <p style={subtitle}>
            Add, edit, and manage your education history for your portfolio.
          </p>
        </div>

        <div style={formCard}>
          <div style={sectionHeader}>
            <h2 style={sectionTitle}>
              {editIndex !== null ? "Edit Education" : "Add Education"}
            </h2>

            {editIndex !== null && (
              <button onClick={resetForm} style={secondaryButton}>
                Cancel Edit
              </button>
            )}
          </div>

          <div style={formGrid}>
            <div style={field}>
              <label style={label}>Degree</label>
              <input
                placeholder="B.E in Information Science"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                style={input}
              />
            </div>

            <div style={field}>
              <label style={label}>College</label>
              <input
                placeholder="CMR Institute of Technology"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                style={input}
              />
            </div>

            <div style={field}>
              <label style={label}>Year</label>
              <input
                placeholder="2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={input}
              />
            </div>
          </div>

          <div style={actionRow}>
            <button onClick={handleSave} style={primaryButton} disabled={loading}>
              {loading
                ? "Saving..."
                : editIndex !== null
                ? "Update Education"
                : "Add Education"}
            </button>
          </div>
        </div>

        <div style={listHeader}>
          <h2 style={sectionTitle}>Saved Education</h2>
          <span style={countBadge}>{education.length}</span>
        </div>

        {education.length === 0 ? (
          <div style={emptyState}>
            <p style={emptyText}>No education added yet.</p>
          </div>
        ) : (
          <div style={cardGrid}>
            {education.map((edu, index) => (
              <div key={index} style={educationCard}>
                <div style={educationCardBody}>
                  <h3 style={educationTitle}>{edu.degree}</h3>
                  <p style={educationCollege}>{edu.college}</p>
                  <p style={educationYear}>{edu.year}</p>

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
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
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

const educationCard = {
  background: "rgba(17, 24, 39, 0.65)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "16px",
  overflow: "hidden"
};

const educationCardBody = {
  padding: "20px"
};

const educationTitle = {
  fontSize: "1.15rem",
  fontWeight: 700,
  color: "#f8fafc",
  marginBottom: "8px"
};

const educationCollege = {
  color: "#60a5fa",
  fontWeight: 600,
  marginBottom: "6px",
  lineHeight: 1.6
};

const educationYear = {
  color: "#94a3b8",
  fontSize: "0.9rem",
  marginBottom: "16px"
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

export default Education;