"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuotationById = exports.getAgentQuotations = exports.saveQuotationToDB = void 0;
const api_1 = __importDefault(require("./api"));
// Save quotation to backend
const saveQuotationToDB = async (quotation, agentId) => {
    try {
        console.log("📤 Sending quotation:", quotation);
        // Calculate total from items
        const total_amount = quotation.items?.reduce((sum, item) => sum + item.quantity * item.rate * (1 + (item.gstPercent || 0) / 100), 0);
        const res = await api_1.default.post("/quotations", {
            agentId,
            client_name: quotation.clientName,
            client_code: quotation.clientCode,
            items: Array.isArray(quotation.items) ? quotation.items : [],
            total_amount,
            project_location: quotation.projectLocation || null,
            project_type: quotation.projectType || null,
            deprecated_assessment_type: quotation.deprecatedAssessmentType || null,
        });
        console.log("✅ Quotation saved successfully:", res.data);
        return res.data;
    }
    catch (error) {
        console.error("❌ Error saving quotation:", error.response?.data || error.message);
        throw error; // important so UI catch works
    }
};
exports.saveQuotationToDB = saveQuotationToDB;
// Fetch quotations of an agent
const getAgentQuotations = async (agentId) => {
    const res = await api_1.default.get(`/quotations/agent/${agentId}`);
    return res.data;
};
exports.getAgentQuotations = getAgentQuotations;
// Fetch single quotation by ID
const getQuotationById = async (id) => {
    const res = await api_1.default.get(`/quotations/${id}`);
    return res.data;
};
exports.getQuotationById = getQuotationById;
