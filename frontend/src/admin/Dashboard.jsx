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
  background: "#080c14",
  color: "#f8fafc",
  padding: "32px 20px 80px"
};

const wrapper = {
  maxWidth: "900px",
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

const card = {
  background: "rgba(17, 24, 39, 0.75)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  padding: "24px",
  marginBottom: "28px",
  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.3)"
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginBottom: "18px"
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

const textarea = {
  width: "100%",
  minHeight: "110px",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  background: "rgba(15, 23, 42, 0.8)",
  color: "#f8fafc",
  fontSize: "0.95rem",
  outline: "none",
  resize: "vertical",
  fontFamily: "inherit",
  lineHeight: 1.6
};

const buttonRow = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "8px"
};

const saveButton = {
  padding: "12px 22px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)"
};

const logoutButton = {
  padding: "12px 22px",
  borderRadius: "10px",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  background: "rgba(239, 68, 68, 0.15)",
  color: "#fca5a5",
  fontWeight: 600,
  cursor: "pointer"
};

const previewCard = {
  background: "rgba(17, 24, 39, 0.6)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "16px",
  padding: "24px"
};

const previewTitle = {
  fontSize: "1.1rem",
  fontWeight: 700,
  marginBottom: "12px",
  color: "#93c5fd"
};

const previewName = {
  fontSize: "1.4rem",
  fontWeight: 700,
  marginBottom: "8px",
  color: "#f8fafc"
};

const previewDesc = {
  color: "#cbd5e1",
  lineHeight: 1.7
};

export default Dashboard;