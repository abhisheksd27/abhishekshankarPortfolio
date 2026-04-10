import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!username.trim() || !password.trim()) {
        alert("Please enter username and password");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { username, password }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <h1 style={title}>Admin Login</h1>
        <p style={subtitle}>
          Enter your credentials to access the admin dashboard
        </p>

        <div style={field}>
          <label style={label}>Username</label>
          <input
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={input}
          />
        </div>

        <div style={field}>
          <label style={label}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />
        </div>

        <button onClick={handleLogin} style={button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

// ================= STYLES =================

const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f8fafc",
  padding: "20px"
};

const card = {
  width: "100%",
  maxWidth: "400px",
  background: "#ffffff",
  padding: "30px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)"
};

const title = {
  fontSize: "1.8rem",
  fontWeight: 700,
  color: "#111827",
  marginBottom: "6px",
  textAlign: "center"
};

const subtitle = {
  fontSize: "0.95rem",
  color: "#6b7280",
  textAlign: "center",
  marginBottom: "24px"
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "16px"
};

const label = {
  fontSize: "0.9rem",
  color: "#374151",
  fontWeight: 500
};

const input = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontSize: "0.95rem",
  outline: "none",
  background: "#fff",
  color: "#111827"
};

const button = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#111827",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
  marginTop: "10px"
};

export default Login;