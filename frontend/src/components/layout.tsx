import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const agentName = localStorage.getItem("agentName");
  const role = localStorage.getItem("role"); // SUPER_ADMIN | AGENT

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      {/* HEADER */}
      <header
        style={{
          padding: "12px 20px",
          background: "#0b051e",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <strong>Kothi Agent Panel</strong>
          <div style={{ fontSize: 12 }}>
            Welcome, {agentName} ({role})
          </div>
        </div>

        <button onClick={logout} style={{ padding: "6px 12px" }}>
          Logout
        </button>
      </header>

      {/* NAVIGATION */}
      <nav
        style={{
          padding: "10px 20px",
          background: "#f4f4f4",
          display: "flex",
          gap: 16,
        }}
      >
        {/* COMMON */}
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/quotation/create">Create Quotation</Link>

        {/* ADMIN ONLY */}
        {role === "SUPER_ADMIN" && (
          <>
            <span>|</span>
            <Link to="/admin/dashboard">Admin Dashboard</Link>
            <Link to="/admin/users">Manage Users</Link>
          </>
        )}
      </nav>

      {/* CONTENT */}
      <main style={{ padding: 20 }}>{children}</main>
    </div>
  );
};

export default Layout;
