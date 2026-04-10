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

  const token = localStorage.getItem("token");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio`);
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
  }, []);

  const handleChange = (e) => {
    setContact((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      if (!contact.email.trim() && !contact.phone.trim()) {
        alert("Please add at least email or phone");
        return;
      }

      setLoading(true);

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/portfolio`,
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

      alert("Contact updated successfully");
    } catch (err) {
      console.error(err);
      alert("Error saving contact");
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
            Manage your email, phone number, and social profile links.
          </p>
        </div>

        <div style={card}>
          <div style={grid}>
            <div style={field}>
              <label style={label}>Email</label>
              <input
                name="email"
                placeholder="you@example.com"
                value={contact.email}
                onChange={handleChange}
                style={input}
              />
            </div>

            <div style={field}>
              <label style={label}>Phone</label>
              <input
                name="phone"
                placeholder="+91 9876543210"
                value={contact.phone}
                onChange={handleChange}
                style={input}
              />
            </div>

            <div style={{ ...field, gridColumn: "1 / -1" }}>
              <label style={label}>GitHub</label>
              <input
                name="github"
                placeholder="https://github.com/yourusername"
                value={contact.github}
                onChange={handleChange}
                style={input}
              />
            </div>

            <div style={{ ...field, gridColumn: "1 / -1" }}>
              <label style={label}>LinkedIn</label>
              <input
                name="linkedin"
                placeholder="https://linkedin.com/in/yourprofile"
                value={contact.linkedin}
                onChange={handleChange}
                style={input}
              />
            </div>

            <div style={{ ...field, gridColumn: "1 / -1" }}>
              <label style={label}>Twitter / X</label>
              <input
                name="twitter"
                placeholder="https://x.com/yourhandle"
                value={contact.twitter}
                onChange={handleChange}
                style={input}
              />
            </div>
          </div>

          <div style={previewCard}>
            <h2 style={previewTitle}>Preview</h2>
            <p style={previewLine}>
              <strong>Email:</strong> {contact.email || "Not added"}
            </p>
            <p style={previewLine}>
              <strong>Phone:</strong> {contact.phone || "Not added"}
            </p>

            <div style={previewLinks}>
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noreferrer" style={link}>
                  GitHub
                </a>
              )}
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noreferrer" style={link}>
                  LinkedIn
                </a>
              )}
              {contact.twitter && (
                <a href={contact.twitter} target="_blank" rel="noreferrer" style={link}>
                  Twitter
                </a>
              )}
            </div>
          </div>

          <div style={buttonRow}>
            <button onClick={handleSave} style={saveButton} disabled={loading}>
              {loading ? "Saving..." : "Save Contact"}
            </button>
          </div>
        </div>
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
  maxWidth: "1000px",
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

const card = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "16px",
  marginBottom: "20px"
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

const previewCard = {
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "18px",
  marginBottom: "20px"
};

const previewTitle = {
  fontSize: "1.05rem",
  fontWeight: 600,
  color: "#111827",
  marginBottom: "12px"
};

const previewLine = {
  color: "#374151",
  marginBottom: "8px",
  lineHeight: 1.6
};

const previewLinks = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "12px"
};

const link = {
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: 500
};

const buttonRow = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap"
};

const saveButton = {
  padding: "12px 18px",
  borderRadius: "10px",
  border: "none",
  background: "#111827",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer"
};

export default Contact;