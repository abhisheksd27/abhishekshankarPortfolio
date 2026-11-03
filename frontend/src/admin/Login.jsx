import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    if (!username.trim() || !password.trim()) {
      setErrorMsg("Please enter both username and password.");
      return;
    }

    try {
      setLoading(true);

      const apiUrl = import.meta.env.VITE_API_URL || "";
      const res = await axios.post(
        `${apiUrl}/api/auth/login`,
        { username: username.trim(), password: password.trim() }
      );

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/admin/dashboard");
      } else {
        setErrorMsg("Authentication failed. No token returned.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      const serverMsg = error.response?.data?.message;
      setErrorMsg(serverMsg || "Invalid credentials. Please verify your username and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={headerBlock}>
          <h1 style={title}>Portfolio Admin</h1>
          <p style={subtitle}>Sign in to manage portfolio content.</p>
        </div>

        {errorMsg && (
          <div style={errorBanner}>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={field}>
            <label style={label}>Username</label>
            <input
              type="text"
              placeholder="e.g. admin or AbhishekShankar"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={input}
              autoComplete="username"
              required
            />
          </div>

          <div style={field}>
            <label style={label}>Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={input}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" style={button} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={footerRow}>
          <Link to="/" style={backLink}>
            ← Return to Portfolio
          </Link>
        </div>
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
  background: "#090a0f",
  padding: "24px",
};

const card = {
  width: "100%",
  maxWidth: "400px",
  background: "#121318",
  padding: "36px 32px",
  borderRadius: "8px",
  border: "1px solid #20222b",
};

const headerBlock = {
  marginBottom: "24px",
  textAlign: "center",
};

const title = {
  fontSize: "1.35rem",
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: "6px",
  letterSpacing: "-0.01em",
};

const subtitle = {
  fontSize: "0.88rem",
  color: "#a1a1aa",
};

const errorBanner = {
  background: "#221316",
  border: "1px solid #451a1f",
  color: "#f87171",
  padding: "10px 14px",
  borderRadius: "6px",
  fontSize: "0.85rem",
  marginBottom: "18px",
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "16px",
};

const label = {
  fontSize: "0.82rem",
  color: "#d4d4d8",
  fontWeight: 500,
};

const input = {
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #282a35",
  fontSize: "0.9rem",
  outline: "none",
  background: "#181920",
  color: "#f4f4f5",
};

const button = {
  width: "100%",
  padding: "11px",
  borderRadius: "6px",
  border: "none",
  background: "#ffffff",
  color: "#090a0f",
  fontWeight: 600,
  fontSize: "0.9rem",
  cursor: "pointer",
  marginTop: "8px",
  transition: "background 0.15s ease",
};

const footerRow = {
  marginTop: "20px",
  textAlign: "center",
};

const backLink = {
  color: "#71717a",
  fontSize: "0.82rem",
  textDecoration: "none",
};

export default Login;