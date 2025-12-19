"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Login_1 = __importDefault(require("./pages/Login"));
const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
const react_1 = __importDefault(require("react"));
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : react_1.default.createElement(react_router_dom_1.Navigate, { to: "/" });
};
function App() {
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(react_router_dom_1.Routes, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(Login_1.default, null) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/dashboard", element: react_1.default.createElement(PrivateRoute, null,
                    react_1.default.createElement(Dashboard_1.default, { agentName: "", onLogout: function () {
                            throw new Error("Function not implemented.");
                        } })) }))));
}
exports.default = App;
