"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuotation = exports.createQuotation = exports.deleteQuotation = exports.getQuotationById = exports.getAdminQuotations = void 0;
const api_1 = __importDefault(require("./api"));
// Fetch all quotations
const getAdminQuotations = async () => {
    const res = await api_1.default.get("/admin/quotations");
    return res.data.data;
};
exports.getAdminQuotations = getAdminQuotations;
// Fetch single quotation
const getQuotationById = async (id) => {
    const res = await api_1.default.get(`/admin/quotations/${id}`);
    return res.data.data;
};
exports.getQuotationById = getQuotationById;
// Delete quotation
const deleteQuotation = async (id) => {
    const res = await api_1.default.delete(`/admin/quotations/${id}`);
    return res.data;
};
exports.deleteQuotation = deleteQuotation;
// Create quotation
const createQuotation = async (data) => {
    const res = await api_1.default.post("/admin/quotations", data);
    return res.data.data;
};
exports.createQuotation = createQuotation;
// Update quotation
const updateQuotation = async (id, data) => {
    const res = await api_1.default.put(`/admin/quotations/${id}`, data);
    return res.data.data;
};
exports.updateQuotation = updateQuotation;
