import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [name, setName] = useState("");

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
      const token = localStorage.getItem("token");
      const apiUrl = import.meta.env.VITE_API_URL || "";
      await axios.post(
        `${apiUrl}/api/portfolio`,
        { home: { name } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Home section updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Home Section</h2>
        <div style={styles.field}>
          <label style={styles.label}>Your Name</label>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={handleUpdate} style={styles.button}>
          Update Name
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#080c14", color: "#f8fafc", padding: "32px 20px" },
  card: { maxWidth: "600px", margin: "0 auto", background: "rgba(17, 24, 39, 0.75)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "16px", padding: "24px" },
  title: { fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px", color: "#f8fafc" },
  field: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px" },
  label: { fontSize: "0.88rem", fontWeight: 600, color: "#cbd5e1" },
  input: { background: "rgba(15, 23, 42, 0.8)", color: "#f8fafc", padding: "12px 14px", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "10px", width: "100%", outline: "none" },
  button: { background: "linear-gradient(135deg, #2563eb, #4f46e5)", color: "#fff", padding: "12px 22px", borderRadius: "10px", border: "none", cursor: "pointer", fontWeight: 600 }
};

export default Home;