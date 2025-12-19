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
const CreateUserModal_1 = __importDefault(require("./CreateUserModal"));
const ChangePasswordModal_1 = __importDefault(require("./ChangePasswordModal"));
const Users = () => {
    const [users, setUsers] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)("");
    const [showCreate, setShowCreate] = (0, react_1.useState)(false);
    const [selectedUserId, setSelectedUserId] = (0, react_1.useState)(null);
    const [showChangePassword, setShowChangePassword] = (0, react_1.useState)(false);
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await api_1.default.get("/admin/users");
            setUsers(res.data.data);
        }
        catch (err) {
            setError("Failed to fetch users.");
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        fetchUsers();
    }, []);
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?"))
            return;
        try {
            await api_1.default.delete(`/admin/users/${id}`);
            fetchUsers();
        }
        catch {
            alert("Failed to delete user");
        }
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { style: styles.header },
            react_1.default.createElement("h3", null, "Users"),
            react_1.default.createElement("button", { style: styles.createBtn, onClick: () => setShowCreate(true) }, "+ Create User")),
        loading ? (react_1.default.createElement("p", null, "Loading users...")) : error ? (react_1.default.createElement("p", { style: { color: "red" } }, error)) : (react_1.default.createElement("div", { style: styles.table },
            react_1.default.createElement("div", { style: styles.tableHeader },
                react_1.default.createElement("span", null, "Name"),
                react_1.default.createElement("span", null, "Email"),
                react_1.default.createElement("span", null, "Role"),
                react_1.default.createElement("span", null, "Status"),
                react_1.default.createElement("span", null, "Created At"),
                react_1.default.createElement("span", null, "Actions")),
            users.map((user) => (react_1.default.createElement("div", { key: user.id, style: styles.tableRow },
                react_1.default.createElement("span", null, user.name),
                react_1.default.createElement("span", null, user.email),
                react_1.default.createElement("span", null, user.role),
                react_1.default.createElement("span", null, user.is_active ? "Active" : "Inactive"),
                react_1.default.createElement("span", null, new Date(user.created_at).toLocaleString()),
                react_1.default.createElement("span", { style: styles.actions },
                    react_1.default.createElement("button", { style: styles.actionBtn, onClick: () => {
                            setSelectedUserId(user.id);
                            setShowChangePassword(true);
                        } }, "Change Password"),
                    react_1.default.createElement("button", { style: { ...styles.actionBtn, backgroundColor: "#ff4d4f" }, onClick: () => handleDelete(user.id) }, "Delete"))))))),
        showCreate && (react_1.default.createElement(CreateUserModal_1.default, { onClose: () => {
                setShowCreate(false);
                fetchUsers();
            }, onUserCreated: fetchUsers })),
        showChangePassword && selectedUserId && (react_1.default.createElement(ChangePasswordModal_1.default, { userId: selectedUserId, onClose: () => setShowChangePassword(false), onPasswordChanged: fetchUsers }))));
};
exports.default = Users;
// ---------------- STYLES ----------------
const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    createBtn: {
        padding: "8px 16px",
        backgroundColor: "#0b051e",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
    },
    table: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        padding: 10,
    },
    tableHeader: {
        display: "contents",
        fontWeight: "bold",
        textAlign: "left",
    },
    tableRow: {
        display: "contents",
        padding: "8px 0",
        borderBottom: "1px solid #ddd",
    },
    actions: {
        display: "flex",
        gap: 8,
    },
    actionBtn: {
        padding: "4px 8px",
        backgroundColor: "#1890ff",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
    },
};
