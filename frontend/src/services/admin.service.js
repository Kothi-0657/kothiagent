"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAdmin = exports.toggleUserStatusAdmin = exports.getAllUsersAdmin = exports.deleteQuotationAdmin = exports.getAllQuotationsAdmin = void 0;
const api_1 = __importDefault(require("./api"));
// -------- QUOTATIONS --------
const getAllQuotationsAdmin = async () => {
    const res = await api_1.default.get("/api/admin/quotations");
    return res.data.data;
};
exports.getAllQuotationsAdmin = getAllQuotationsAdmin;
const deleteQuotationAdmin = async (id) => {
    return api_1.default.delete(`/api/admin/quotations/${id}`);
};
exports.deleteQuotationAdmin = deleteQuotationAdmin;
// -------- USERS --------
const getAllUsersAdmin = async () => {
    const res = await api_1.default.get("/api/admin/users");
    return res.data.data;
};
exports.getAllUsersAdmin = getAllUsersAdmin;
const toggleUserStatusAdmin = async (id, active) => {
    return api_1.default.patch(`/api/admin/users/${id}/status`, { active });
};
exports.toggleUserStatusAdmin = toggleUserStatusAdmin;
const deleteUserAdmin = async (id) => {
    return api_1.default.delete(`/api/admin/users/${id}`);
};
exports.deleteUserAdmin = deleteUserAdmin;
