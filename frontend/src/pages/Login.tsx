import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      /**
       * ✅ BACKEND RESPONSE SHAPE (YOUR CURRENT ONE)
       * {
       *   token,
       *   role,
       *   agentId,
       *   agentName
       * }
       */
      const { token, role, agentId, agentName } = res.data;

      if (!token || !role) {
        setError("Invalid server response");
        return;
      }

      // ✅ Allow both ADMIN & AGENT
      if (role !== "AGENT" && role !== "SUPER_ADMIN") {
        setError("You are not allowed to login here");
        return;
      }

      // ✅ Store auth data
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("agentId", String(agentId));
      localStorage.setItem("agentName", agentName);

      // ✅ Role based redirect
      if (role === "SUPER_ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Kothi Portal</h2>
        <p style={styles.subtitle}>Agent & Admin Login</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

/* -------------------- STYLES -------------------- */

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0b051e, #1f2a63)",
  },
  card: {
    width: 380,
    padding: "32px",
    borderRadius: 14,
    backgroundColor: "#fff",
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
  },
  title: {
    textAlign: "center",
    marginBottom: 4,
    color: "#0b051e",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 13,
    marginBottom: 24,
    color: "#666",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: 14,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "none",
    backgroundColor: "#0b051e",
    color: "#fff",
    fontSize: 15,
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },
};
