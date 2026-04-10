import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= AUTH + LOAD =================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const load = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio`);

        setName(res.data?.home?.name || "");
        setDesc(res.data?.about?.desc || "");
      } catch (err) {
        console.error("Failed to load portfolio:", err);
      }
    };

    load();
  }, []);

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  // ================= SAVE =================
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Unauthorized: Login again");

      if (!name.trim() || !desc.trim()) {
        alert("Please fill all fields");
        return;
      }

      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/portfolio`,
        { home: { name }, about: { desc } },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Portfolio updated successfully");
    } catch (error) {
      console.error("Error updating portfolio:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={wrapper}>
        {/* HEADER */}
        <div style={header}>
          <h1 style={title}>Dashboard</h1>
          <p style={subtitle}>
            Update your portfolio introduction and basic information.
          </p>
        </div>

        {/* FORM */}
        <div style={card}>
          <div style={field}>
            <label style={label}>Your Name</label>
            <input
              value={name}
              placeholder="Abhishek Shankar"
              onChange={(e) => setName(e.target.value)}
              style={input}
            />
          </div>

          <div style={field}>
            <label style={label}>Short Description</label>
            <textarea
              value={desc}
              placeholder="Full-stack developer building scalable applications..."
              onChange={(e) => setDesc(e.target.value)}
              style={textarea}
            />
          </div>

          <div style={buttonRow}>
            <button onClick={handleSubmit} style={saveButton} disabled={loading}>
              {loading ? "Saving..." : "Update Portfolio"}
            </button>

            <button onClick={handleLogout} style={logoutButton}>
              Logout
            </button>
          </div>
        </div>

        {/* PREVIEW */}
        <div style={previewCard}>
          <h2 style={previewTitle}>Preview</h2>

          <h3 style={previewName}>{name || "Your Name"}</h3>
          <p style={previewDesc}>
            {desc || "Your description will appear here..."}
          </p>
        </div>
      </div>
    </div>
  );
}

// ================= STYLES =================

const page = {
  minHeight: "100vh",
  background: "#f8fafc",
  padding: "24px 16px"
};

const wrapper = {
  maxWidth: "900px",
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
  marginBottom: "24px",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)"
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginBottom: "16px"
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
  background: "#fff",
  color: "#111827",
  fontSize: "0.95rem"
};

const textarea = {
  width: "100%",
  minHeight: "100px",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  background: "#fff",
  color: "#111827",
  fontSize: "0.95rem",
  resize: "vertical"
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

const logoutButton = {
  padding: "12px 18px",
  borderRadius: "10px",
  border: "none",
  background: "#dc2626",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer"
};

const previewCard = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)"
};

const previewTitle = {
  fontSize: "1.1rem",
  fontWeight: 600,
  marginBottom: "12px",
  color: "#111827"
};

const previewName = {
  fontSize: "1.4rem",
  fontWeight: 700,
  marginBottom: "8px"
};

const previewDesc = {
  color: "#6b7280",
  lineHeight: 1.6
};

export default Dashboard;