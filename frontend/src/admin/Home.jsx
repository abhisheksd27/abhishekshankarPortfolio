import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "";
        const res = await axios.get(`${apiUrl}/api/portfolio`);
        setName(res.data.home?.name || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "";
      await axios.post(
        `${apiUrl}/api/portfolio`,
        { home: { name } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg("Name updated successfully.");
      setTimeout(() => setMsg(""), 3500);
    } catch (err) {
      console.error(err);
      alert("Failed to update name.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Hero Brand Settings</h2>
        {msg && <div style={styles.alert}>{msg}</div>}
        <div style={styles.field}>
          <label style={styles.label}>Display Full Name</label>
          <input
            placeholder="Abhishek Shankar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={handleUpdate} style={styles.button} disabled={loading}>
          {loading ? "Saving..." : "Update Name"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#090a0f", color: "#f4f4f5", padding: "32px 20px" },
  card: { maxWidth: "600px", margin: "0 auto", background: "#121318", border: "1px solid #20222b", borderRadius: "8px", padding: "24px" },
  title: { fontSize: "1.25rem", fontWeight: 600, marginBottom: "20px", color: "#ffffff" },
  field: { display: "flex", flexDirection: "column", gap: "6px", marginBottom: "18px" },
  label: { fontSize: "0.82rem", fontWeight: 500, color: "#d4d4d8" },
  input: { background: "#181920", color: "#f4f4f5", padding: "10px 12px", border: "1px solid #282a35", borderRadius: "6px", width: "100%", outline: "none", fontSize: "0.9rem" },
  button: { background: "#ffffff", color: "#090a0f", padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.88rem" },
  alert: { background: "#13231a", border: "1px solid #1c3b29", color: "#4ade80", padding: "10px 14px", borderRadius: "6px", fontSize: "0.85rem", marginBottom: "16px" }
};

export default Home;