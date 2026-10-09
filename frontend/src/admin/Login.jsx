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
      setErrorMsg("Please enter both username and password");
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
        setErrorMsg("Failed to authenticate. No token returned.");
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
        <div style={brandBadge}>AS</div>
        <h1 style={title}>Admin Portal</h1>
        <p style={subtitle}>
          Sign in to manage portfolio content, experience, and projects.
        </p>

        {errorMsg && (
          <div style={errorBanner}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
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
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </button>
        </form>

        <div style={footerRow}>
          <Link to="/" style={backLink}>
            ← Back to Public Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

// ================= MODERN STYLES =================
const page = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#080c14",
  padding: "24px",
  position: "relative",
};

const card = {
  width: "100%",
  maxWidth: "420px",
  background: "rgba(17, 24, 39, 0.8)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  padding: "36px 32px",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 20px 48px rgba(0, 0, 0, 0.4)",
};

const brandBadge = {
  width: "44px",
  height: "44px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #2563eb, #4f46e5)",
  color: "#ffffff",
  display: "grid",
  placeItems: "center",
  fontWeight: 800,
  fontSize: "1.1rem",
  margin: "0 auto 16px auto",
  boxShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
};

const title = {
  fontSize: "1.6rem",
  fontWeight: 800,
  color: "#f8fafc",
  marginBottom: "8px",
  textAlign: "center",
  letterSpacing: "-0.02em",
};

const subtitle = {
  fontSize: "0.9rem",
  color: "#94a3b8",
  textAlign: "center",
  marginBottom: "24px",
  lineHeight: 1.5,
};

const errorBanner = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "rgba(239, 68, 68, 0.12)",
  border: "1px solid rgba(239, 68, 68, 0.3)",
  color: "#fca5a5",
  padding: "10px 14px",
  borderRadius: "10px",
  fontSize: "0.86rem",
  marginBottom: "18px",
  lineHeight: 1.4,
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "18px",
};

const label = {
  fontSize: "0.85rem",
  color: "#cbd5e1",
  fontWeight: 600,
  letterSpacing: "0.02em",
};

const input = {
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  fontSize: "0.95rem",
  outline: "none",
  background: "rgba(15, 23, 42, 0.7)",
  color: "#f8fafc",
  transition: "border-color 0.2s ease",
};

const button = {
  width: "100%",
  padding: "13px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
  color: "#ffffff",
  fontWeight: 600,
  fontSize: "0.95rem",
  cursor: "pointer",
  marginTop: "8px",
  boxShadow: "0 6px 20px rgba(37, 99, 235, 0.35)",
  transition: "transform 0.2s ease, opacity 0.2s ease",
};

const footerRow = {
  marginTop: "24px",
  textAlign: "center",
};

const backLink = {
  color: "#94a3b8",
  fontSize: "0.85rem",
  textDecoration: "none",
  transition: "color 0.2s ease",
};

export default Login;