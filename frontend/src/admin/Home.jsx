// Home.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar.jsx";

function Home() {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/portfolio`);
      setName(res.data.home?.name || "");
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/portfolio`,
      { home: { name } },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Home updated!");
  };

  return (
    <div style={{ display: "flex" }}>
      
      <div style={styles.container}>
        <h2>Home Section</h2>
        <input
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleUpdate} style={styles.button}>Update Name</button>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px", flex: 1, color: "#00ff00", fontFamily: "monospace" },
  input: { background: "#111", color: "#00ff00", padding: "10px", border: "1px solid #00ff00", width: "300px", marginBottom: "15px" },
  button: { background: "#222", color: "#00ff00", padding: "10px 20px", border: "1px solid #00ff00", cursor: "pointer" }
};

export default Home;