"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserPassword = exports.createUser = exports.deleteUser = exports.toggleUserStatus = exports.getUsers = void 0;
const db_1 = __importDefault(require("../db"));
/**
 * GET ALL USERS (Admin)
 * Includes agents + super admin
 */
const getUsers = async (_req, res) => {
    try {
        const result = await db_1.default.query(`
      SELECT 
        id,
        name,
        email,
        role,
        is_active,
        created_at
      FROM users
      ORDER BY created_at DESC
    `);
        res.json({
            success: true,
            data: result.rows,
        });
    }
    catch (error) {
        console.error("Get users error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
};
exports.getUsers = getUsers;
/**
 * ENABLE / DISABLE USER (Admin)
 */
const toggleUserStatus = async (req, res) => {
    const { id } = req.params;
    const { active } = req.body;
    try {
        const user = await db_1.default.query("SELECT role FROM users WHERE id = $1", [id]);
        if (user.rows[0]?.role === "SUPER_ADMIN") {
            return res
                .status(403)
                .json({ message: "Cannot modify Super Admin" });
        }
        await db_1.default.query("UPDATE users SET is_active = $1 WHERE id = $2", [active, id]);
        res.json({ success: true });
    }
    catch (error) {
        console.error("Toggle user error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update user",
        });
    }
};
exports.toggleUserStatus = toggleUserStatus;
/**
 * DELETE USER (Admin)
 */
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db_1.default.query("SELECT role FROM users WHERE id = $1", [id]);
        if (user.rows[0]?.role === "SUPER_ADMIN") {
            return res
                .status(403)
                .json({ message: "Cannot delete Super Admin" });
        }
        await db_1.default.query("DELETE FROM users WHERE id = $1", [id]);
        res.json({ success: true });
    }
    catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
        });
    }
};
exports.deleteUser = deleteUser;
/**
 * CREATE AGENT USER (Admin)
 */
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }
    try {
        // check duplicate email
        const exists = await db_1.default.query("SELECT id FROM users WHERE email = $1", [email]);
        if (exists.rowCount) {
            return res.status(400).json({ message: "Email already exists" });
        }
        await db_1.default.query(`
      INSERT INTO users (name, email, password, role, is_active)
      VALUES ($1, $2, $3, 'AGENT', true)
      `, [name, email, password] // plain password for now
        );
        res.json({ success: true });
    }
    catch (err) {
        console.error("Create user error:", err);
        res.status(500).json({ message: "Failed to create user" });
    }
};
exports.createUser = createUser;
const changeUserPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    try {
        await db_1.default.query("UPDATE users SET password = $1 WHERE id = $2", [password, id]);
        res.json({ success: true });
    }
    catch (err) {
        console.error("Change password error:", err);
        res.status(500).json({ message: "Failed to change password" });
    }
};
exports.changeUserPassword = changeUserPassword;
