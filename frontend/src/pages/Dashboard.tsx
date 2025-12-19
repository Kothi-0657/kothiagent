import React, { useState } from "react";
import CreateQuotation from "./quotation/CreateQuotation";
import ViewQuotations from "./quotation/ViewQuotation";
import { Quotation } from "../types/quotation";
import ServicesTab from "./ServicesTab";
import ErrorBoundary from "../components/ErrorBoundary";

const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  // ✅ Read agent info from localStorage
  const agentId = Number(localStorage.getItem("agentId") || 0);
  const agentName = localStorage.getItem("agentName") || "Agent";

  const [activeTab, setActiveTab] = useState<"quotations" | "calls" | "followups" | "services">("quotations");
  const [quotationTab, setQuotationTab] = useState<"create" | "view">("create");
  const [quotationToEdit, setQuotationToEdit] = useState<Quotation | null>(null);

  // Callback when clicking a quotation to edit
  const handleEditQuotation = (quotation: Quotation) => {
    setQuotationToEdit(quotation);
    setQuotationTab("create"); // switch to Create tab
  };

  return (
    <div style={styles.dashboardWrapper}>
      {/* Top Bar */}
      <header style={styles.topBar}>
        <div style={styles.agentInfo}>
          <span>Welcome, {agentName}</span>
        </div>
        <button style={styles.logoutButton} onClick={onLogout}>
          Logout
        </button>
      </header>

      {/* Main Container */}
      <div style={styles.dashboardContainer}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Agent Dashboard</h2>
          <button
            style={activeTab === "quotations" ? styles.activeTabButton : styles.tabButton}
            onClick={() => setActiveTab("quotations")}
          >
            Quotations
          </button>
          <button
            style={activeTab === "calls" ? styles.activeTabButton : styles.tabButton}
            onClick={() => setActiveTab("calls")}
          >
            Calls
          </button>
          <button
            style={activeTab === "followups" ? styles.activeTabButton : styles.tabButton}
            onClick={() => setActiveTab("followups")}
          >
            Follow Ups
          </button>
          <button
            style={activeTab === "services" ? styles.activeTabButton : styles.tabButton}
    onClick={() => setActiveTab("services")}
  >
    Services
  </button>
        </aside>
        

        {/* Main Content */}
        <main style={styles.mainContent}>
          {activeTab === "quotations" && (
            <div>
              {/* Quotation Tabs */}
              <div style={styles.quotationTabButtons}>
                <button
                  style={quotationTab === "create" ? styles.activeTabButton : styles.tabButton}
                  onClick={() => {
                    setQuotationTab("create");
                    setQuotationToEdit(null); // reset form for new quotation
                  }}
                >
                  Create Quotation
                </button>
                <button
                  style={quotationTab === "view" ? styles.activeTabButton : styles.tabButton}
                  onClick={() => setQuotationTab("view")}
                >
                  View Quotations
                </button>
              </div>

              <div style={{ marginTop: 20 }}>
                {/* Create Quotation */}
                {quotationTab === "create" && (
                  <CreateQuotation quotationToEdit={quotationToEdit || undefined} />
                )}

                {/* View Quotations */}
                {quotationTab === "view" && (
                  <ViewQuotations agentId={agentId} onEdit={handleEditQuotation} />
                )}
              </div>
            </div>
          )}

          {activeTab === "calls" && (
            <div>
              <h2>Calls Section</h2>
              <p>Call logs and details will appear here.</p>
            </div>
          )}

          {activeTab === "followups" && (
            <div>
              <h2>Follow Ups</h2>
              <p>List of quotations for follow-up will appear here.</p>
            </div>
          )}
          <ErrorBoundary>
            {activeTab === "services" && <ServicesTab />}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

// ------------------------ Styles ------------------------
const styles: { [key: string]: React.CSSProperties } = {
  dashboardWrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "#121212",
    color: "#fff",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "rgba(20,20,20,0.9)",
    backdropFilter: "blur(5px)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  agentInfo: { fontSize: "1.1rem", fontWeight: 500 },
  logoutButton: {
    background: "#ff4081",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  dashboardContainer: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    flexGrow: 1,
  },
  sidebar: {
    background: "rgba(30,30,30,0.8)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  sidebarTitle: { marginBottom: "20px", color: "#00ffdd" },
  tabButton: {
    background: "rgba(255,255,255,0.05)",
    border: "none",
    padding: "10px 20px",
    marginBottom: "10px",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "background 0.3s",
  },
  activeTabButton: {
    background: "rgba(0,255,221,0.3)",
    color: "#00ffdd",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  mainContent: {
    padding: "30px",
    background: "rgba(20,20,20,0.8)",
    backdropFilter: "blur(5px)",
  },
  quotationTabButtons: { display: "flex", gap: "10px"},
};
