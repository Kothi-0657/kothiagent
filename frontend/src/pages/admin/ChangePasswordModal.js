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
const ChangePasswordModal = ({ userId, onClose, onSuccess, }) => {
    const [password, setPassword] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = async () => {
        if (!password)
            return alert("Enter password");
        try {
            setLoading(true);
            await api_1.default.patch(`/admin/users/${userId}/password`, { password });
            alert("Password updated");
            onSuccess();
            onClose();
        }
        catch {
            alert("Failed to update password");
        }
        finally {
            setLoading(false);
        }
    };
    return (react_1.default.createElement("div", { style: overlay },
        react_1.default.createElement("div", { style: modal },
            react_1.default.createElement("h3", null, "Change Password"),
            react_1.default.createElement("input", { type: "password", placeholder: "New Password", value: password, onChange: (e) => setPassword(e.target.value), style: input }),
            react_1.default.createElement("div", { style: { display: "flex", gap: 10 } },
                react_1.default.createElement("button", { onClick: handleSubmit, style: primaryBtn, disabled: loading }, "Update"),
                react_1.default.createElement("button", { onClick: onClose, style: secondaryBtn }, "Cancel")))));
};
exports.default = ChangePasswordModal;
// ---------------- styles ----------------
const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};
const modal = {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 350,
};
const input = {
    width: "100%",
    padding: 10,
    marginBottom: 15,
};
const primaryBtn = {
    padding: "8px 16px",
    background: "#0b051e",
    color: "#fff",
    border: "none",
    borderRadius: 6,
};
const secondaryBtn = {
    padding: "8px 16px",
    border: "1px solid #0b051e",
    borderRadius: 6,
    background: "#fff",
};
