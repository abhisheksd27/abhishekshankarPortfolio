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
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "14px",
};

const educationCard = {
  background: "#121318",
  border: "1px solid #20222b",
  borderRadius: "8px",
  padding: "20px",
};

const educationCardBody = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const educationTitle = {
  fontSize: "1.05rem",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: "4px",
};

const educationCollege = {
  color: "#d4d4d8",
  fontSize: "0.9rem",
  lineHeight: 1.5,
};

const educationYear = {
  color: "#a1a1aa",
  fontSize: "0.78rem",
  fontFamily: "var(--font-mono)",
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid #20222b",
  padding: "3px 8px",
  borderRadius: "4px",
  width: "fit-content",
  marginBottom: "8px",
};

const buttonRow = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
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

export default Education;