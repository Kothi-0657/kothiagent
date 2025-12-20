"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pg_1 = require("pg");
const router = (0, express_1.Router)();
const pool = new pg_1.Pool({
    user: "kishlaysingh",
    host: "localhost",
    database: "kothiagent_db",
    password: "", // add password if postgres has one
    port: 5432,
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("👉 LOGIN REQUEST BODY:", req.body);
        const query = `
      SELECT id, name, email, password, role, is_active
      FROM users
      WHERE email = $1
    `;
        console.log("👉 RUNNING QUERY:", query);
        const result = await pool.query(query, [email]);
        console.log("👉 QUERY RESULT:", result.rows);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const user = result.rows[0];
        if (!user.is_active) {
            return res.status(403).json({ message: "User inactive" });
        }
        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        return res.json({
            token: "TEMP_TOKEN",
            role: user.role,
            agentId: user.id,
            agentName: user.name,
        });
    }
    catch (error) {
        console.error("🔥 LOGIN ERROR OBJECT:", error);
        console.error("🔥 LOGIN ERROR MESSAGE:", error?.message);
        console.error("🔥 LOGIN ERROR STACK:", error?.stack);
        return res.status(500).json({
            message: "Server error",
            error: error?.message || "unknown",
        });
    }
});
exports.default = router;
