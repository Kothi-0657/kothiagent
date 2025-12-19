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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const api_1 = __importDefault(require("../services/api"));
const Login = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [email, setEmail] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [error, setError] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await api_1.default.post("/auth/login", {
                email,
                password,
            });
            /**
             * ✅ BACKEND RESPONSE SHAPE (YOUR CURRENT ONE)
             * {
             *   token,
             *   role,
             *   agentId,
             *   agentName
             * }
             */
            const { token, role, agentId, agentName } = res.data;
            if (!token || !role) {
                setError("Invalid server response");
                return;
            }
            // ✅ Allow both ADMIN & AGENT
            if (role !== "AGENT" && role !== "SUPER_ADMIN") {
                setError("You are not allowed to login here");
                return;
            }
            // ✅ Store auth data
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("agentId", String(agentId));
            localStorage.setItem("agentName", agentName);
            // ✅ Role based redirect
            if (role === "SUPER_ADMIN") {
                navigate("/admin/dashboard");
            }
            else {
                navigate("/dashboard");
            }
        }
        catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
        finally {
            setLoading(false);
        }
    };
    return (react_1.default.createElement("div", { style: styles.page },
        react_1.default.createElement("div", { style: styles.card },
            react_1.default.createElement("h2", { style: styles.title }, "Kothi Portal"),
            react_1.default.createElement("p", { style: styles.subtitle }, "Agent & Admin Login"),
            react_1.default.createElement("form", { onSubmit: handleSubmit },
                react_1.default.createElement("input", { type: "email", placeholder: "Email", value: email, required: true, onChange: (e) => setEmail(e.target.value), style: styles.input }),
                react_1.default.createElement("input", { type: "password", placeholder: "Password", value: password, required: true, onChange: (e) => setPassword(e.target.value), style: styles.input }),
                error && react_1.default.createElement("p", { style: styles.error }, error),
                react_1.default.createElement("button", { type: "submit", style: styles.button, disabled: loading }, loading ? "Logging in..." : "Login")))));
};
exports.default = Login;
/* -------------------- STYLES -------------------- */
const styles = {
    page: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0b051e, #1f2a63)",
    },
    card: {
        width: 380,
        padding: "32px",
        borderRadius: 14,
        backgroundColor: "#fff",
        boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
    },
    title: {
        textAlign: "center",
        marginBottom: 4,
        color: "#0b051e",
    },
    subtitle: {
        textAlign: "center",
        fontSize: 13,
        marginBottom: 24,
        color: "#666",
    },
    input: {
        width: "100%",
        padding: "10px 12px",
        marginBottom: 14,
        borderRadius: 6,
        border: "1px solid #ccc",
        fontSize: 14,
    },
    button: {
        width: "100%",
        padding: 10,
        borderRadius: 6,
        border: "none",
        backgroundColor: "#0b051e",
        color: "#fff",
        fontSize: 15,
        cursor: "pointer",
    },
    error: {
        color: "red",
        fontSize: 13,
        marginBottom: 10,
        textAlign: "center",
    },
};
