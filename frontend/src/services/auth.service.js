"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const api_1 = __importDefault(require("./api"));
const login = async (email, password) => {
    const res = await api_1.default.post("/auth/login", { email, password });
    return res.data;
};
exports.login = login;
