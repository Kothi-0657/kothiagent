import React, { useState } from "react";
import Layout from "../../components/layout";
import ViewQuotationAdmin from "../../pages/quotation/ViewQuotationAdmin";
import Users from "./user";

const tabs = ["Quotations", "Users", "Calls", "Follow-ups"];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  const [showCreateUser, setShowCreateUser] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Quotations":
        return <ViewQuotationAdmin />;

      case "Users":
        return (
          <Users/>
        );

      case "Calls":
        return (
          <p style={styles.placeholder}>
            Calls section coming soon...
          </p>
        );

      case "Follow-ups":
        return (
          <p style={styles.placeholder}>
            Follow-up section coming soon...
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      {/* HEADER */}
      <div style={styles.headerRow}>
        <h1>Admin Dashboard</h1>

        {/* Contextual Action Button */}
        {activeTab === "Users" && (
          <button
            style={styles.primaryButton}
            onClick={() => setShowCreateUser(true)}
          >
            + Create User
          </button>
        )}
      </div>

      {/* TABS */}
      <div style={styles.tabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.tabButton,
              ...(activeTab === tab ? styles.activeTab : {}),
            }}
            onClick={() => {
              setActiveTab(tab);
              setShowCreateUser(false);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={styles.tabContent}>
        {renderTabContent()}
      </div>
    </Layout>
  );
};

export default AdminDashboard;


// ----------------- STYLES -----------------
const styles: { [key: string]: React.CSSProperties } = {
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  primaryButton: {
    padding: "10px 18px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#0b051e",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  },
  tabContainer: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  tabButton: {
    padding: "10px 20px",
    borderRadius: 8,
    border: "1px solid #0b051e",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  activeTab: {
    backgroundColor: "#0b051e",
    color: "#fff",
  },
  tabContent: {
    minHeight: "60vh",
  },
  placeholder: {
    textAlign: "center",
    fontSize: 18,
    color: "#555",
    padding: 40,
    border: "2px dashed #0b051e",
    borderRadius: 12,
  },
};

