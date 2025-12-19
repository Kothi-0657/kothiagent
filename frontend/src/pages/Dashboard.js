"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const CreateQuotation_1 = __importDefault(require("./quotation/CreateQuotation"));
const ViewQuotation_1 = __importDefault(require("./quotation/ViewQuotation"));
const ServicesTab_1 = __importDefault(require("../pages/ServicesTab"));
const ErrorBoundary_1 = __importDefault(require("../components/ErrorBoundary"));
const Dashboard = ({ onLogout }) => {
    // ✅ Read agent info from localStorage
    const agentId = Number(localStorage.getItem("agentId") || 0);
    const agentName = localStorage.getItem("agentName") || "Agent";
    const [activeTab, setActiveTab] = (0, react_1.useState)("quotations");
    const [quotationTab, setQuotationTab] = (0, react_1.useState)("create");
    const [quotationToEdit, setQuotationToEdit] = (0, react_1.useState)(null);
    // Callback when clicking a quotation to edit
    const handleEditQuotation = (quotation) => {
        setQuotationToEdit(quotation);
        setQuotationTab("create"); // switch to Create tab
    };
    return (react_1.default.createElement("div", { style: styles.dashboardWrapper },
        react_1.default.createElement("header", { style: styles.topBar },
            react_1.default.createElement("div", { style: styles.agentInfo },
                react_1.default.createElement("span", null,
                    "Welcome, ",
                    agentName)),
            react_1.default.createElement("button", { style: styles.logoutButton, onClick: onLogout }, "Logout")),
        react_1.default.createElement("div", { style: styles.dashboardContainer },
            react_1.default.createElement("aside", { style: styles.sidebar },
                react_1.default.createElement("h2", { style: styles.sidebarTitle }, "Agent Dashboard"),
                react_1.default.createElement("button", { style: activeTab === "quotations" ? styles.activeTabButton : styles.tabButton, onClick: () => setActiveTab("quotations") }, "Quotations"),
                react_1.default.createElement("button", { style: activeTab === "calls" ? styles.activeTabButton : styles.tabButton, onClick: () => setActiveTab("calls") }, "Calls"),
                react_1.default.createElement("button", { style: activeTab === "followups" ? styles.activeTabButton : styles.tabButton, onClick: () => setActiveTab("followups") }, "Follow Ups"),
                react_1.default.createElement("button", { style: activeTab === "services" ? styles.activeTabButton : styles.tabButton, onClick: () => setActiveTab("services") }, "Services")),
            react_1.default.createElement("main", { style: styles.mainContent },
                activeTab === "quotations" && (react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { style: styles.quotationTabButtons },
                        react_1.default.createElement("button", { style: quotationTab === "create" ? styles.activeTabButton : styles.tabButton, onClick: () => {
                                setQuotationTab("create");
                                setQuotationToEdit(null); // reset form for new quotation
                            } }, "Create Quotation"),
                        react_1.default.createElement("button", { style: quotationTab === "view" ? styles.activeTabButton : styles.tabButton, onClick: () => setQuotationTab("view") }, "View Quotations")),
                    react_1.default.createElement("div", { style: { marginTop: 20 } },
                        quotationTab === "create" && (react_1.default.createElement(CreateQuotation_1.default, { quotationToEdit: quotationToEdit })),
                        quotationTab === "view" && (react_1.default.createElement(ViewQuotation_1.default, { agentId: agentId, onEdit: handleEditQuotation }))))),
                activeTab === "calls" && (react_1.default.createElement("div", null,
                    react_1.default.createElement("h2", null, "Calls Section"),
                    react_1.default.createElement("p", null, "Call logs and details will appear here."))),
                activeTab === "followups" && (react_1.default.createElement("div", null,
                    react_1.default.createElement("h2", null, "Follow Ups"),
                    react_1.default.createElement("p", null, "List of quotations for follow-up will appear here."))),
                react_1.default.createElement(ErrorBoundary_1.default, null, activeTab === "services" && react_1.default.createElement(ServicesTab_1.default, null))))));
};
exports.default = Dashboard;
// ------------------------ Styles ------------------------
const styles = {
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
    quotationTabButtons: { display: "flex", gap: "10px" },
};
