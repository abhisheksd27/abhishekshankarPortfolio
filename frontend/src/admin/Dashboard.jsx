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
  background: "#090a0f",
  color: "#f4f4f5",
  padding: "32px 20px 80px"
};

const wrapper = {
  maxWidth: "860px",
  margin: "0 auto"
};

const header = {
  marginBottom: "24px"
};

const title = {
  fontSize: "1.5rem",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: "6px",
  letterSpacing: "-0.01em"
};

const subtitle = {
  color: "#a1a1aa",
  lineHeight: 1.5,
  fontSize: "0.88rem"
};

const card = {
  background: "#121318",
  border: "1px solid #20222b",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "24px"
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "16px"
};

const label = {
  fontSize: "0.82rem",
  fontWeight: 500,
  color: "#d4d4d8"
};

const input = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #282a35",
  background: "#181920",
  color: "#f4f4f5",
  fontSize: "0.9rem",
  outline: "none"
};

const textarea = {
  width: "100%",
  minHeight: "110px",
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #282a35",
  background: "#181920",
  color: "#f4f4f5",
  fontSize: "0.9rem",
  outline: "none",
  resize: "vertical",
  fontFamily: "inherit",
  lineHeight: 1.5
};

const buttonRow = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginTop: "8px"
};

const saveButton = {
  padding: "10px 20px",
  borderRadius: "6px",
  border: "none",
  background: "#ffffff",
  color: "#090a0f",
  fontWeight: 600,
  fontSize: "0.88rem",
  cursor: "pointer"
};

const logoutButton = {
  padding: "10px 16px",
  borderRadius: "6px",
  border: "1px solid #2b1f22",
  background: "#181214",
  color: "#f87171",
  fontWeight: 500,
  fontSize: "0.85rem",
  cursor: "pointer"
};

const previewCard = {
  background: "#121318",
  border: "1px solid #20222b",
  borderRadius: "8px",
  padding: "20px"
};

const previewTitle = {
  fontSize: "0.92rem",
  fontWeight: 600,
  marginBottom: "10px",
  color: "#ffffff"
};

const previewName = {
  fontSize: "1.2rem",
  fontWeight: 600,
  marginBottom: "6px",
  color: "#ffffff"
};

const previewDesc = {
  color: "#a1a1aa",
  fontSize: "0.9rem",
  lineHeight: 1.6
};

export default Dashboard;