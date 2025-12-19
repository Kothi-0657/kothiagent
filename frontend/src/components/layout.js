"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Layout = ({ children }) => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const agentName = localStorage.getItem("agentName");
    const role = localStorage.getItem("role"); // SUPER_ADMIN | AGENT
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("header", { style: {
                padding: "12px 20px",
                background: "#0b051e",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            } },
            react_1.default.createElement("div", null,
                react_1.default.createElement("strong", null, "Kothi Agent Panel"),
                react_1.default.createElement("div", { style: { fontSize: 12 } },
                    "Welcome, ",
                    agentName,
                    " (",
                    role,
                    ")")),
            react_1.default.createElement("button", { onClick: logout, style: { padding: "6px 12px" } }, "Logout")),
        react_1.default.createElement("nav", { style: {
                padding: "10px 20px",
                background: "#f4f4f4",
                display: "flex",
                gap: 16,
            } },
            react_1.default.createElement(react_router_dom_1.Link, { to: "/dashboard" }, "Dashboard"),
            react_1.default.createElement(react_router_dom_1.Link, { to: "/quotation/create" }, "Create Quotation"),
            role === "SUPER_ADMIN" && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("span", null, "|"),
                react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/dashboard" }, "Admin Dashboard"),
                react_1.default.createElement(react_router_dom_1.Link, { to: "/admin/users" }, "Manage Users")))),
        react_1.default.createElement("main", { style: { padding: 20 } }, children)));
};
exports.default = Layout;
