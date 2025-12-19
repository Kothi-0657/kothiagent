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
const react_1 = __importStar(require("react"));
const quotationStore_1 = require("../../services/quotationStore");
const ViewQuotations = ({ agentId, onEdit }) => {
    const [quotations, setQuotations] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (agentId)
            fetchQuotations();
    }, [agentId]);
    const fetchQuotations = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await (0, quotationStore_1.getAgentQuotations)(agentId);
            // ✅ map snake_case to camelCase
            const mapped = (data?.quotations || []).map((q) => ({
                ...q,
                clientName: q.client_name,
                clientCode: q.client_code,
                projectLocation: q.project_location,
                projectType: q.project_type,
                totalAmount: q.total_amount,
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
    if (loading)
        return react_1.default.createElement("p", null, "Loading quotations...");
    if (error)
        return react_1.default.createElement("p", { style: { color: "red" } }, error);
    if (quotations.length === 0)
        return react_1.default.createElement("p", null, "No quotations found.");
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h3", { style: { marginBottom: 15 } }, "Old Quotations"),
        react_1.default.createElement("ul", { style: { listStyle: "none", padding: 0 } }, quotations.map((q) => (react_1.default.createElement("li", { key: q.id, style: {
                marginBottom: 15,
                padding: 15,
                border: "1px solid #090101ff",
                borderRadius: 8,
                cursor: onEdit ? "pointer" : "default",
                backgroundColor: "#cc905bff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                transition: "transform 0.1s, box-shadow 0.2s",
            }, onClick: () => onEdit && onEdit(q), onMouseEnter: (e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.15)";
            }, onMouseLeave: (e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                    "0 2px 6px rgba(0,0,0,0.1)";
            } },
            react_1.default.createElement("strong", null, q.clientName || "Unnamed Client"),
            " \u2014 \u20B9",
            q.totalAmount?.toLocaleString() || "0",
            " ",
            react_1.default.createElement("br", null),
            "Project: ",
            q.projectType || "-",
            " ",
            react_1.default.createElement("br", null),
            "Location: ",
            q.projectLocation || "-",
            " ",
            react_1.default.createElement("br", null),
            "Created: ",
            q.created_at ? new Date(q.created_at).toLocaleString() : "-"))))));
};
exports.default = ViewQuotations;
