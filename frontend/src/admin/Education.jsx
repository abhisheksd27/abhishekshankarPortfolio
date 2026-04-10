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
  background: "#f8fafc",
  padding: "24px 16px"
};

const wrapper = {
  maxWidth: "1100px",
  margin: "0 auto"
};

const header = {
  marginBottom: "24px"
};

const title = {
  fontSize: "2rem",
  fontWeight: 700,
  color: "#111827",
  marginBottom: "8px"
};

const subtitle = {
  color: "#6b7280",
  lineHeight: 1.6
};

const formCard = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "20px",
  marginBottom: "28px",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)"
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  marginBottom: "18px"
};

const sectionTitle = {
  fontSize: "1.2rem",
  fontWeight: 600,
  color: "#111827"
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px"
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const label = {
  fontSize: "0.95rem",
  fontWeight: 500,
  color: "#374151"
};

const input = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "0.95rem",
  outline: "none",
  background: "#fff",
  color: "#111827"
};

const actionRow = {
  marginTop: "18px",
  display: "flex",
  gap: "12px",
  flexWrap: "wrap"
};

const primaryButton = {
  padding: "12px 18px",
  borderRadius: "10px",
  border: "none",
  background: "#111827",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer"
};

const secondaryButton = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  background: "#fff",
  color: "#111827",
  fontWeight: 500,
  cursor: "pointer"
};

const listHeader = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "16px"
};

const countBadge = {
  background: "#e5e7eb",
  color: "#111827",
  borderRadius: "999px",
  padding: "4px 10px",
  fontSize: "0.85rem",
  fontWeight: 600
};

const emptyState = {
  background: "#ffffff",
  border: "1px dashed #d1d5db",
  borderRadius: "16px",
  padding: "32px",
  textAlign: "center"
};

const emptyText = {
  color: "#6b7280"
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "18px"
};

const educationCard = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)"
};

const educationCardBody = {
  padding: "18px"
};

const educationTitle = {
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "#111827",
  marginBottom: "8px"
};

const educationCollege = {
  color: "#4b5563",
  marginBottom: "6px",
  lineHeight: 1.6
};

const educationYear = {
  color: "#6b7280",
  marginBottom: "14px"
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const editButton = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  background: "#fff",
  color: "#111827",
  fontWeight: 500,
  cursor: "pointer"
};

const deleteButton = {
  padding: "10px 14px",
  borderRadius: "10px",
  border: "none",
  background: "#dc2626",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer"
};

export default Education;