"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Login_1 = __importDefault(require("./pages/Login"));
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
// ADMIN
const AdminDashboard_1 = __importDefault(require("./pages/admin/AdminDashboard"));
const user_1 = __importDefault(require("./pages/admin/user"));
const CreateQuotationAdmin_1 = __importDefault(require("./pages/quotation/CreateQuotationAdmin"));
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : react_1.default.createElement(react_router_dom_1.Navigate, { to: "/", replace: true });
};
// 🔥 TEMP MOCK ROLE
const userRole = "SUPER_ADMIN"; // later from backend / JWT
const AppRoutes = () => (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement(react_router_dom_1.Routes, null,
        react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Login_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/dashboard", element: react_1.default.createElement(PrivateRoute, null,
                react_1.default.createElement(Dashboard_1.default, { agentName: "", onLogout: () => localStorage.removeItem("token") })) }),
        userRole === "SUPER_ADMIN" && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/dashboard", element: react_1.default.createElement(PrivateRoute, null,
                    react_1.default.createElement(AdminDashboard_1.default, null)) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/users", element: react_1.default.createElement(PrivateRoute, null,
                    react_1.default.createElement(user_1.default, null)) }))),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/quotation/create", element: react_1.default.createElement(CreateQuotationAdmin_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/admin/quotation/edit/:id", element: react_1.default.createElement(CreateQuotationAdmin_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "*", element: react_1.default.createElement("div", null, "Page Not Found") }))));
exports.AppRoutes = AppRoutes;
