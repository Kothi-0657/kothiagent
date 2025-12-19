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
// src/pages/admin/CreateEditQuotationAdmin.tsx
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const QuotationForm_1 = __importDefault(require("../../components/QuotationForm"));
const QuotePreview_1 = __importDefault(require("../../components/QuotePreview"));
const adminquotationStore_1 = require("../../services/adminquotationStore");
const CreateEditQuotationAdmin = () => {
    const { id } = (0, react_router_dom_1.useParams)();
    const [quotation, setQuotation] = (0, react_1.useState)({
        id: 0,
        clientName: "",
        clientCode: "",
        projectLocation: "",
        projectType: "",
        items: [],
        totalAmount: 0,
        agentName: "",
        created_at: "",
    });
    const [loading, setLoading] = (0, react_1.useState)(!!id);
    (0, react_1.useEffect)(() => {
        if (id)
            fetchQuotation(id);
    }, [id]);
    const fetchQuotation = async (quotationId) => {
        setLoading(true);
        try {
            const data = await (0, adminquotationStore_1.getQuotationById)(Number(quotationId));
            setQuotation({
                id: data.id,
                clientName: data.client_name ?? "",
                clientCode: data.client_code ?? "",
                projectLocation: data.project_location ?? "",
                projectType: data.project_type ?? "",
                items: data.items ?? [],
                totalAmount: data.total_amount ?? 0,
                agentName: data.agent_name ?? "",
                created_at: data.created_at ?? "",
            });
        }
        catch (err) {
            console.error("Failed to load quotation:", err);
            alert("Failed to load quotation for editing.");
        }
        finally {
            setLoading(false);
        }
    };
    if (loading)
        return react_1.default.createElement("p", null, "Loading quotation...");
    return (react_1.default.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 } },
        react_1.default.createElement(QuotationForm_1.default, { quotation: quotation, setQuotation: setQuotation }),
        react_1.default.createElement(QuotePreview_1.default, { quotation: quotation })));
};
exports.default = CreateEditQuotationAdmin;
