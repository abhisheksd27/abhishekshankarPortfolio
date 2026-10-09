import { useState, useEffect } from "react";
import axios from "axios";

function Contact() {
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    github: "",
    linkedin: "",
    twitter: ""
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_URL || "";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/portfolio`);
        setContact({
          email: res.data?.contact?.email || "",
          phone: res.data?.contact?.phone || "",
          github: res.data?.contact?.github || "",
          linkedin: res.data?.contact?.linkedin || "",
          twitter: res.data?.contact?.twitter || ""
        });
      } catch (err) {
        console.error("Failed to load contact:", err);
      }
    };

    load();
  }, [API_URL]);

  const handleChange = (e) => {
    setContact((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      if (!contact.email.trim() && !contact.phone.trim()) {
        alert("Please provide at least an email or phone number.");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/portfolio`,
        { contact },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setContact({
        email: res.data?.contact?.email || "",
        phone: res.data?.contact?.phone || "",
        github: res.data?.contact?.github || "",
        linkedin: res.data?.contact?.linkedin || "",
        twitter: res.data?.contact?.twitter || ""
      });

      setMsg("Contact details updated successfully.");
      setTimeout(() => setMsg(""), 3500);
    } catch (err) {
      console.error(err);
      alert("Error saving contact details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={wrapper}>
        <div style={header}>
          <h1 style={title}>Contact Information</h1>
          <p style={subtitle}>
            Manage public contact details, channels, and professional social profiles.
          </p>
        </div>

        {msg && <div style={successAlert}>{msg}</div>}

        <div style={card}>
          <div style={grid}>
            <div style={field}>
              <label style={label}>Primary Email</label>
              <input
                name="email"
                placeholder="Abhishekdshankar@gmail.com"
                value={contact.email}
                onChange={handleChange}
                style={input}
              />
            </div>

            <div style={field}>
              <label style={label}>Phone Number</label>
              <input
                name="phone"
                placeholder="+91 7338006503"
                value={contact.phone}
                onChange={handleChange}
                style={input}
              />
            </div>

            <div style={{ ...field, gridColumn: "1 / -1" }}>
              <label style={label}>GitHub Profile URL</label>
              <input
                name="github"
                placeholder="https://github.com/abhisheksd27"
                value={contact.github}
                onChange={handleChange}
                style={input}
              />
            </div>

            <div style={{ ...field, gridColumn: "1 / -1" }}>
              <label style={label}>LinkedIn Profile URL</label>
              <input
                name="linkedin"
                placeholder="https://www.linkedin.com/in/abhishekshankar27/"
                value={contact.linkedin}
                onChange={handleChange}
                style={input}
              />
            </div>

            <div style={{ ...field, gridColumn: "1 / -1" }}>
              <label style={label}>X / Twitter Profile URL (Optional)</label>
              <input
                name="twitter"
                placeholder="https://x.com/username"
                value={contact.twitter}
                onChange={handleChange}
                style={input}
              />
            </div>
          </div>

          <div style={previewCard}>
            <h2 style={previewTitle}>Live Display Preview</h2>
            <div style={previewLine}>
              <span style={previewKey}>Email:</span>
              <span style={previewVal}>{contact.email || "Not specified"}</span>
            </div>
            <div style={previewLine}>
              <span style={previewKey}>Phone:</span>
              <span style={previewVal}>{contact.phone || "Not specified"}</span>
            </div>

            <div style={previewLinks}>
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noreferrer" style={link}>
                  GitHub ↗
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noreferrer" style={link}>
                  LinkedIn ↗
                </a>
              )}
              {contact.twitter && (
                <a href={contact.twitter} target="_blank" rel="noreferrer" style={link}>
                  Twitter / X ↗
                </a>
              )}
            </div>
          </div>

          <div style={buttonRow}>
            <button onClick={handleSave} style={saveButton} disabled={loading}>
              {loading ? "Saving..." : "Save Contact Info"}
            </button>
          </div>
        </div>
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

const card = {
  background: "#121318",
  border: "1px solid #20222b",
  borderRadius: "8px",
  padding: "24px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "14px",
  marginBottom: "24px",
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

const previewCard = {
  background: "#181920",
  border: "1px solid #282a35",
  borderRadius: "6px",
  padding: "18px",
  marginBottom: "20px",
};

const previewTitle = {
  fontSize: "0.92rem",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: "12px",
};

const previewLine = {
  display: "flex",
  gap: "8px",
  fontSize: "0.85rem",
  marginBottom: "6px",
};

const previewKey = {
  color: "#71717a",
  fontWeight: 500,
  minWidth: "60px",
};

const previewVal = {
  color: "#d4d4d8",
  fontFamily: "var(--font-mono)",
};

const previewLinks = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "12px",
  paddingTop: "10px",
  borderTop: "1px solid #282a35",
};

const link = {
  color: "#93c5fd",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "0.85rem",
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const saveButton = {
  padding: "10px 20px",
  borderRadius: "6px",
  border: "none",
  background: "#ffffff",
  color: "#090a0f",
  fontWeight: 600,
  fontSize: "0.88rem",
  cursor: "pointer",
};

export default Contact;