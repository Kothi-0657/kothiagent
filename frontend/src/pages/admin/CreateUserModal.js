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
const api_1 = __importDefault(require("../../services/api"));
const CreateUserModal = ({ onClose, onCreated }) => {
    const [form, setForm] = (0, react_1.useState)({
        name: "",
        email: "",
        password: "",
        role: "AGENT",
    });
    const [error, setError] = (0, react_1.useState)("");
    const submit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await api_1.default.post("/admin/users", form);
            onCreated();
            onClose();
        }
        catch (err) {
            setError(err.response?.data?.message || "Failed to create user");
        }
    };
    return (react_1.default.createElement("div", { style: styles.overlay },
        react_1.default.createElement("form", { style: styles.modal, onSubmit: submit },
            react_1.default.createElement("h2", null, "Create New User"),
            react_1.default.createElement("input", { placeholder: "Name", required: true, value: form.name, onChange: (e) => setForm({ ...form, name: e.target.value }) }),
            react_1.default.createElement("input", { placeholder: "Email", type: "email", required: true, value: form.email, onChange: (e) => setForm({ ...form, email: e.target.value }) }),
            react_1.default.createElement("input", { placeholder: "Password", type: "password", required: true, value: form.password, onChange: (e) => setForm({ ...form, password: e.target.value }) }),
            react_1.default.createElement("select", { value: form.role, onChange: (e) => setForm({ ...form, role: e.target.value }) },
                react_1.default.createElement("option", { value: "AGENT" }, "Agent"),
                react_1.default.createElement("option", { value: "SUPER_ADMIN" }, "Admin")),
            error && react_1.default.createElement("p", { style: { color: "red" } }, error),
            react_1.default.createElement("div", { style: styles.actions },
                react_1.default.createElement("button", { type: "button", onClick: onClose }, "Cancel"),
                react_1.default.createElement("button", { type: "submit", style: styles.primary }, "Create")))));
};
exports.default = CreateUserModal;
/* ---------------- STYLES ---------------- */
const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    modal: {
        background: "#fff",
        padding: 30,
        borderRadius: 12,
        width: 380,
        display: "flex",
        flexDirection: "column",
        gap: 12,
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 10,
    },
    primary: {
        background: "#0b051e",
        color: "#fff",
        border: "none",
        padding: "8px 14px",
        borderRadius: 6,
        cursor: "pointer",
    },
};
