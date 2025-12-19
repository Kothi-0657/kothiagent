"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class ErrorBoundary extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (react_1.default.createElement("div", { style: { padding: 20, color: "red" } },
                react_1.default.createElement("h3", null, "Services page crashed"),
                react_1.default.createElement("pre", null, this.state.error?.message)));
        }
        return this.props.children;
    }
}
exports.default = ErrorBoundary;
