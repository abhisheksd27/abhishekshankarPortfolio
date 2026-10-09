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
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL || "";

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

  const handleSave = async (e) => {
    if (e) e.preventDefault();
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
      setMsg(editIndex !== null ? "Certification updated successfully." : "Certification added successfully.");
      setTimeout(() => setMsg(""), 3500);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving certification.");
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
            Manage technical credentials, verified links, and credential issuers.
          </p>
        </div>

        {msg && <div style={successAlert}>{msg}</div>}

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
                placeholder="Google Cybersecurity Professional Certificate"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div style={field}>
              <label style={label}>Issuer</label>
              <input
                style={input}
                placeholder="Google / Coursera"
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
              />
            </div>

            <div style={{ ...field, gridColumn: "1 / -1" }}>
              <label style={label}>Verification URL</label>
              <input
                style={input}
                placeholder="https://coursera.org/verify/..."
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />
            </div>

            <div style={{ ...field, gridColumn: "1 / -1" }}>
              <label style={label}>Certificate Image (Optional)</label>
              <input
                style={fileInput}
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {(file || form.image) && (
                <p style={helperText}>
                  {file ? `Selected file: ${file.name}` : "Existing image configured"}
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
          <h2 style={sectionTitle}>Active Certifications</h2>
          <span style={countBadge}>{certs.length}</span>
        </div>

        {certs.length === 0 ? (
          <div style={emptyState}>
            <p style={emptyText}>No certifications recorded yet.</p>
          </div>
        ) : (
          <div style={cardGrid}>
            {certs.map((cert, index) => (
              <div key={index} style={certCard}>
                <div style={certCardBody}>
                  <div>
                    <h3 style={certTitle}>{cert.name}</h3>
                    <p style={certIssuer}>{cert.issuer}</p>
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
                      View Credential ↗
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

const fileInput = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #282a35",
  background: "#181920",
  color: "#a1a1aa",
  fontSize: "0.85rem",
};

const helperText = {
  fontSize: "0.78rem",
  color: "#71717a",
  marginTop: "4px",
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

const certCard = {
  background: "#121318",
  border: "1px solid #20222b",
  borderRadius: "8px",
  padding: "18px",
};

const certCardBody = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const certTitle = {
  fontSize: "1.02rem",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: "3px",
};

const certIssuer = {
  color: "#a1a1aa",
  fontWeight: 500,
  fontSize: "0.85rem",
};

const imageWrap = {
  borderRadius: "6px",
  overflow: "hidden",
  border: "1px solid #20222b",
  background: "#090a0f",
};

const image = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
  display: "block",
  cursor: "pointer",
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

export default Certification;