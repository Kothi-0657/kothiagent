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
const layout_1 = __importDefault(require("../../components/layout"));
const ViewQuotationAdmin_1 = __importDefault(require("../../pages/quotation/ViewQuotationAdmin"));
const user_1 = __importDefault(require("./user"));
const tabs = ["Quotations", "Users", "Calls", "Follow-ups"];
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = (0, react_1.useState)(tabs[0]);
    const [showCreateUser, setShowCreateUser] = (0, react_1.useState)(false);
    const renderTabContent = () => {
        switch (activeTab) {
            case "Quotations":
                return react_1.default.createElement(ViewQuotationAdmin_1.default, null);
            case "Users":
                return (react_1.default.createElement(user_1.default, { showCreate: showCreateUser, onCloseCreate: () => setShowCreateUser(false) }));
            case "Calls":
                return (react_1.default.createElement("p", { style: styles.placeholder }, "Calls section coming soon..."));
            case "Follow-ups":
                return (react_1.default.createElement("p", { style: styles.placeholder }, "Follow-up section coming soon..."));
            default:
                return null;
        }
    };
    return (react_1.default.createElement(layout_1.default, null,
        react_1.default.createElement("div", { style: styles.headerRow },
            react_1.default.createElement("h1", null, "Admin Dashboard"),
            activeTab === "Users" && (react_1.default.createElement("button", { style: styles.primaryButton, onClick: () => setShowCreateUser(true) }, "+ Create User"))),
        react_1.default.createElement("div", { style: styles.tabContainer }, tabs.map((tab) => (react_1.default.createElement("button", { key: tab, style: {
                ...styles.tabButton,
                ...(activeTab === tab ? styles.activeTab : {}),
            }, onClick: () => {
                setActiveTab(tab);
                setShowCreateUser(false);
            } }, tab)))),
        react_1.default.createElement("div", { style: styles.tabContent }, renderTabContent())));
};
exports.default = AdminDashboard;
// ----------------- STYLES -----------------
const styles = {
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
