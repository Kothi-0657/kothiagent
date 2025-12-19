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
Object.defineProperty(exports, "__esModule", { value: true });
// src/pages/admin/ViewQuotationsAdmin.tsx
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const adminquotationstore_1 = require("../../services/adminquotationstore");
const ViewQuotationsAdmin = () => {
    const [quotations, setQuotations] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        fetchQuotations();
    }, []);
    const fetchQuotations = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await (0, adminquotationstore_1.getAdminQuotations)();
            const mapped = (data || []).map((q) => ({
                id: q.id,
                clientName: q.client_name ?? "Unnamed Client",
                clientCode: q.client_code ?? "-",
                projectLocation: q.project_location ?? "-",
                projectType: q.project_type ?? "-",
                totalAmount: q.total_amount ?? 0,
                agentName: q.agent_name ?? "-",
                created_at: q.created_at ?? "",
                items: q.items ?? [],
            }));
            setQuotations(mapped);
        }
        catch (err) {
            console.error("Error fetching quotations:", err);
            setError("Failed to load quotations. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    const handleEdit = (q) => {
        navigate(`/admin/quotation/edit/${q.id}`);
    };
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this quotation?"))
            return;
        try {
            await (0, adminquotationstore_1.deleteQuotation)(id);
            setQuotations(quotations.filter((q) => q.id !== id));
        }
        catch (err) {
            console.error(err);
            alert("Failed to delete quotation.");
        }
    };
    if (loading)
        return react_1.default.createElement("p", null, "Loading quotations...");
    if (error)
        return react_1.default.createElement("p", { style: { color: "red" } }, error);
    if (quotations.length === 0)
        return react_1.default.createElement("p", null, "No quotations found.");
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", null, "All Quotations (Admin)"),
        react_1.default.createElement("ul", { style: { listStyle: "none", padding: 0 } }, quotations.map((q) => (react_1.default.createElement("li", { key: q.id, style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15,
                marginBottom: 10,
                border: "1px solid #ccc",
                borderRadius: 8,
                backgroundColor: "#f5f5f5",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                cursor: "pointer",
            } },
            react_1.default.createElement("div", { onClick: () => handleEdit(q), style: { flex: 1 } },
                react_1.default.createElement("strong", null, q.clientName),
                " \u2014 \u20B9",
                q.totalAmount.toLocaleString(),
                " ",
                react_1.default.createElement("br", null),
                "Project: ",
                q.projectType,
                " ",
                react_1.default.createElement("br", null),
                "Location: ",
                q.projectLocation,
                " ",
                react_1.default.createElement("br", null),
                "Agent: ",
                q.agentName,
                " ",
                react_1.default.createElement("br", null),
                "Created: ",
                q.created_at ? new Date(q.created_at).toLocaleString() : "-"),
            react_1.default.createElement("div", { style: { display: "flex", gap: 10 } },
                react_1.default.createElement("button", { onClick: () => handleEdit(q), style: buttonStyle }, "Edit"),
                react_1.default.createElement("button", { onClick: () => handleDelete(q.id), style: buttonStyle }, "Delete"))))))));
};
const buttonStyle = {
    padding: "6px 12px",
    borderRadius: 6,
    border: "none",
    backgroundColor: "#0b051e",
    color: "#fff",
    cursor: "pointer",
};
exports.default = ViewQuotationsAdmin;
