import { useState, useEffect } from "react";
import axios from "axios";

function Certification() {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    issuer: "",
    link: "",
    image: ""
  });
  const [file, setFile] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/portfolio`);
        setCerts(res.data?.certification || []);
      } catch (err) {
        console.error("Failed to load certifications:", err);
      }
    };

    load();
  }, [API_URL]);

  const uploadImage = async () => {
    const data = new FormData();
    data.append("image", file);

    const res = await axios.post(`${API_URL}/api/upload`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    return res.data.imageUrl;
  };

  const resetForm = () => {
    setForm({
      name: "",
      issuer: "",
      link: "",
      image: ""
    });
    setFile(null);
    setEditIndex(null);
  };

  const handleSave = async () => {
    try {
      if (!form.name.trim() || !form.issuer.trim()) {
        alert("Please enter certificate name and issuer");
        return;
      }

      setLoading(true);

      let imageUrl = form.image;

      if (file) {
        imageUrl = await uploadImage();
      }

      const updated = [...certs];
      const newCert = {
        ...form,
        image: imageUrl
      };

      if (editIndex !== null) {
        updated[editIndex] = newCert;
      } else {
        updated.push(newCert);
      }

      const res = await axios.post(
        `${API_URL}/api/portfolio`,
        { certification: updated },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCerts(res.data.certification || []);
      resetForm();
      alert(editIndex !== null ? "Certification updated" : "Certification added");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    setForm(certs[index]);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (index) => {
    try {
      const confirmed = window.confirm("Delete this certification?");
      if (!confirmed) return;

      const updated = certs.filter((_, i) => i !== index);

      const res = await axios.post(
        `${API_URL}/api/portfolio`,
        { certification: updated },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCerts(res.data.certification || []);

      if (editIndex === index) {
        resetForm();
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete certification");
    }
  };

  return (
    <div style={page}>
      <div style={wrapper}>
        <div style={header}>
          <h1 style={title}>Certifications</h1>
          <p style={subtitle}>
            Add, edit, and manage certificate details, links, and preview images.
          </p>
        </div>

        <div style={formCard}>
          <div style={sectionHeader}>
            <h2 style={sectionTitle}>
              {editIndex !== null ? "Edit Certification" : "Add Certification"}
            </h2>
            {editIndex !== null && (
              <button onClick={resetForm} style={secondaryButton}>
                Cancel Edit
              </button>
            )}
          </div>

          <div style={formGrid}>
            <div style={field}>
              <label style={label}>Certificate Name</label>
              <input
                style={input}
                placeholder="AWS Cloud Practitioner"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div style={field}>
              <label style={label}>Issuer</label>
              <input
                style={input}
                placeholder="Amazon Web Services"
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
              />
            </div>

            <div style={{ ...field, gridColumn: "1 / -1" }}>
              <label style={label}>Certificate Link</label>
              <input
                style={input}
                placeholder="https://..."
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />
            </div>

            <div style={{ ...field, gridColumn: "1 / -1" }}>
              <label style={label}>Certificate Image</label>
              <input
                style={fileInput}
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {(file || form.image) && (
                <p style={helperText}>
                  {file ? `Selected: ${file.name}` : "Existing image will be used"}
                </p>
              )}
            </div>
          </div>

          <div style={actionRow}>
            <button onClick={handleSave} style={primaryButton} disabled={loading}>
              {loading
                ? "Saving..."
                : editIndex !== null
                ? "Update Certification"
                : "Add Certification"}
            </button>
          </div>
        </div>

        <div style={listHeader}>
          <h2 style={sectionTitle}>Saved Certifications</h2>
          <span style={countBadge}>{certs.length}</span>
        </div>

        {certs.length === 0 ? (
          <div style={emptyState}>
            <p style={emptyText}>No certifications added yet.</p>
          </div>
        ) : (
          <div style={cardGrid}>
            {certs.map((cert, index) => (
              <div key={index} style={certCard}>
                <div style={certCardBody}>
                  <div style={certTop}>
                    <div>
                      <h3 style={certTitle}>{cert.name}</h3>
                      <p style={certIssuer}>{cert.issuer}</p>
                    </div>
                  </div>

                  {cert.image && (
                    <div style={imageWrap}>
                      <img
                        src={cert.image}
                        alt={cert.name}
                        style={image}
                        onClick={() => cert.link && window.open(cert.link, "_blank")}
                      />
                    </div>
                  )}

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      style={link}
                    >
                      View Certificate
                    </a>
                  )}

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

const fileInput = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  background: "rgba(15, 23, 42, 0.8)",
  color: "#f8fafc"
};

const helperText = {
  fontSize: "0.85rem",
  color: "#93c5fd"
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

const certCard = {
  background: "rgba(17, 24, 39, 0.65)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "16px",
  overflow: "hidden"
};

const certCardBody = {
  padding: "20px"
};

const certTop = {
  marginBottom: "12px"
};

const certTitle = {
  fontSize: "1.15rem",
  fontWeight: 700,
  color: "#f8fafc",
  marginBottom: "4px"
};

const certIssuer = {
  color: "#93c5fd",
  fontWeight: 600,
  fontSize: "0.9rem"
};

const imageWrap = {
  marginBottom: "14px"
};

const image = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "12px",
  cursor: "pointer",
  border: "1px solid rgba(255, 255, 255, 0.1)"
};

const link = {
  display: "inline-block",
  marginBottom: "16px",
  color: "#60a5fa",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "0.9rem"
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

export default Certification;